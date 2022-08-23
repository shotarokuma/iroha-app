import client from "./apollo";

export const storeToken = (token: string | null | undefined): void => {
  if (!token) return;
  localStorage.setItem("token", token);
};

export const redirectLogin = (url: string): boolean => {
  if (url !== "/admin/login") {
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
