import * as fs from "fs";
import { createKeyPair } from "ed25519.js";

export const createKey = (account: string, domain: string): string[] => {
  let publicKey = "";
  let privateKey = "";
  const KEY_DIR = "./keys/";
  const keys = createKeyPair();
  const pub = keys.publicKey;
  const priv = keys.privateKey;

  for (let i = 0; i < 32; i++) {
    publicKey = publicKey + pub[i].toString(16).padStart(2, "0");
  }

  for (let i = 0; i < 32; i++) {
    privateKey = privateKey + priv[i].toString(16).padStart(2, "0");
  }

  fs.writeFile(KEY_DIR + account + "@" + domain + ".pub", publicKey, (err) => {
    if (err) {
      throw err;
    }
  });

  fs.writeFile(
    KEY_DIR + account + "@" + domain + ".priv",
    privateKey,
    (err) => {
      if (err) {
        throw err;
      }
    }
  );

  const keyPair = [publicKey, privateKey];

  return keyPair;
};
