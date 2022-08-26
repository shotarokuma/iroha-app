import React from "react";
import { useRouter } from "next/router";
import client from "./apollo";
import Loading from "../components/Loading";

interface Props {
  children: React.ReactNode;
}

export const storeToken = (token: string | null | undefined): void => {
  if (!token) return;
  localStorage.setItem("token", token);
};

const redirectLogin = (url: string): boolean => {
  if (typeof window !== "undefined" && url !== "/admin/login") {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/admin/login";
      return false;
    }
  }
  return true;
};

export const logout = async (): Promise<void> => {
  try {
    await client.resetStore();
    localStorage.removeItem("token");
  } catch (err) {
    alert(err);
  }
};

export const Auth: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  if (redirectLogin(router.pathname)) {
    return <>{children}</>;
  } else {
    return <Loading />;
  }
};
