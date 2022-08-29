import React from "react";
import { NextPage } from "next";
import { useUser } from "../hooks/user";
import Header from "../components/Header";

const Page: NextPage = () => {
  const { roots, onClickLogOut } = useUser();

  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut} />
    </>
  );
};

export default Page;
