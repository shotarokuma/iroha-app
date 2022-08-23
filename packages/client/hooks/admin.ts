import { useRouter } from "next/router";

export interface AdminRootsProps {
  name: string;
  root: () => Promise<boolean>;
}

export interface useAdminReturnProps {
  roots: AdminRootsProps[];
  onClickLogOut: () => Promise<boolean>;
}

export const useAdmin = (): useAdminReturnProps => {
  const router = useRouter();

  const handleMovePages = (root: string): (() => Promise<boolean>) => {
    const handleMovePage = async (): Promise<boolean> =>
      await router.push(root);
    return handleMovePage;
  };

  const onClickLogOut = async (): Promise<boolean> =>
    await router.push("/admin/login");

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
