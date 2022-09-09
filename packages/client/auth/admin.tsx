import { Role } from "../../graphql/client";
import React from "react";
import { useRouter } from "next/router";
import client from "./apollo";
import Loading from "../components/Loading";

interface Props {
  children: React.ReactNode;
}

export const storeToken = (
  token: string | null | undefined,
  role: Role,
  account?: string
): void => {
  if (!token) return;
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  if (account) localStorage.setItem("account", account);
};

export const logout = async (): Promise<void> => {
  try {
    await client.resetStore();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    if (localStorage.getItem("account")) localStorage.removeItem("account");
  } catch (err) {
    alert(err);
  }
};

export const Auth: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const currRole = router.pathname.includes("admin") ? Role.Admin : Role.User;
  const [loading, setLoading] = React.useState<boolean>(true);

  const getPermission = (
    token: string | null,
    role: string | null,
    constrain: Role
  ): boolean => {
    return token !== null && role !== null && role === constrain;
  };

  React.useEffect(() => {
    const lock = async (): Promise<void> => {
      await router.push(currRole === Role.Admin ? "/admin/login" : "/login");
    };
    if (
      getPermission(
        localStorage.getItem("token"),
        localStorage.getItem("role"),
        currRole
      )
    ) {
      setLoading(false);
    } else {
      lock()
        .then(() => setLoading(false))
        .catch((err) => console.log(err));
    }
  }, []);

  return loading ? <Loading /> : <>{children}</>;
};
