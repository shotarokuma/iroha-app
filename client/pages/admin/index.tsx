import {
  useGetAssetQuery
} from "../../../graphql//client";
import React from "react";
import { NextPage } from "next";
import { useAdmin } from "../../hooks/admin";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

const Page: NextPage = () => {
  const { data:assets, loading: getAssetLoading, error: queryError} = useGetAssetQuery({
    variables: {
       input:{
        account: "admin@japan"
       }
    },
  });
  const { roots, onClickLogOut } = useAdmin();

  if(getAssetLoading){
    return <Loading />
  }
  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut} />
      <h1>admin Home</h1>
    </>
  )
};

export default Page;