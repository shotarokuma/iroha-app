import {
  ReceiveAssetInput,
  useReceiveAssetMutation,
} from "../../../graphql/client";
import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/user";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CurrencyExchange from "@mui/icons-material/CurrencyExchange";
import Button from "@mui/material/Button";
import FormController from "../../components/FormController";
import Loading from "../../components/Loading";
import Header from "../../components/Header";

const Page: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<ReceiveAssetInput>();
  const [receiveAsset, { loading: receiveAssetLoading }] =
    useReceiveAssetMutation();
  const { roots, onClickLogOut } = useUser();

  const onSubmit = React.useCallback(
    async (inputData: ReceiveAssetInput) => {
      const account = localStorage.getItem("account");
      if (account === null) return;
      const password: number = +inputData.password;
      try {
        await receiveAsset({
          variables: {
            input: {
              account,
              password,
            },
          },
        });
        await router.push("/?asset=true");
      } catch (err) {
        alert(err);
      }
    },
    [receiveAsset]
  );

  if (receiveAssetLoading) {
    return <Loading />;
  }
  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut} />
      <Container component="main" maxWidth="xs">
        <CurrencyExchange
          color="secondary"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "40px",
          }}
        />
        <Typography
          component="h2"
          variant="h5"
          textAlign="center"
          style={{
            marginTop: "30px",
          }}
        >
          Receive your bitcoin
        </Typography>
        <form
          style={{
            marginTop: "50px",
          }}
        >
          <FormController
            name="password"
            control={control}
            label="input your password on Email"
            fullWidth={true}
            type="number"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            style={{
              marginTop: "30px",
            }}
          >
            Receive
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Page;
