import { useRouter } from "next/router";

export interface UserRootsProps {
  name: string;
  root: () => Promise<boolean>;
}

export interface useUserReturnProps {
  roots: UserRootsProps[];
  onClickLogOut: () => Promise<boolean>;
}

export const useUser = (): useUserReturnProps => {
  const router = useRouter();

  const handleMovePages = (root: string): (() => Promise<boolean>) => {
    const handleMovePage = async (): Promise<boolean> =>
      await router.push(root);
    return handleMovePage;
  };

  const onClickLogOut = async (): Promise<boolean> =>
    await router.push("/login");

  const roots = [
    {
      name: "HOME",
      root: handleMovePages("/"),
    },
    {
      name: "Receive Asset",
      root: handleMovePages("/receive"),
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
