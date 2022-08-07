import React1 from "react";
import { useRouter } from "next/router";

export type AdminRootsProps = {
  name: string;
  root: () => Promise<boolean>;
};

export type useAdminReturnProps = {
  roots: AdminRootsProps[];
  onClickLogOut: () => Promise<boolean>;
};

export const useAdmin = (): useAdminReturnProps => {
  const router = useRouter();

  const handleMovePages = (root: string) => {
    const handleMovePage = () => router.push(root);
    return handleMovePage;
  };

  const onClickLogOut = () => router.push("/admin/login");

  const roots = [
    {
      name: "HOME",
      root: handleMovePages("/admin"),
    },
    {
      name: "Create Account",
      root: handleMovePages("/admin/sign-up"),
    },
    {
      name: "Create Asset",
      root: handleMovePages("/admin/asset"),
    },
  ];

  return {
    roots,
    onClickLogOut,
  };
};
