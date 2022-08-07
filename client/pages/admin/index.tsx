import React from "react";
import { NextPage } from "next";
import { useAdmin } from "../../hooks/admin";
import Header from "../../components/Header";

const Page: NextPage = () => {
  const { roots, onClickLogOut } = useAdmin();
  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut} />
      <h1>admin Home</h1>
    </>
  )
};

export default Page;