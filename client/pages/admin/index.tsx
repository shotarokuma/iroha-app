import { useCreateAccountMutation, User } from "../../../graphql/client";
import React from "react";
import { NextPage } from "next";

const Page: NextPage = () => {
const [createAccountMutation] = useCreateAccountMutation();
  React.useEffect(() => {
    const user:User = {
      first:"shotaro",
      last:"kumagai",
      email:"shoutarou.kuma59@gmail.com",
      password:"5959"
    };
    
    createAccountMutation({
      variables: { input: user}
    })
  },[createAccountMutation])
  return (
    <><h1>create account</h1></>
  )
};

export default Page;