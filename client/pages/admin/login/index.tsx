import { LoginInput, useLoginMutation } from "../../../../graphql/client";
import React from "react";
import { NextPage } from "next";
import { useRouter } from 'next/router';
import { useForm, FieldValues } from "react-hook-form"
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import KeyIcon from '@mui/icons-material/Key';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormController from "../../../components/FormController";
import Loading from "../../../components/Loading";

const Page: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<LoginInput | FieldValues>();

  const [loginMutation,{ loading: loginLoading, error: mutationError },] = useLoginMutation();

  const onSubmit = React.useCallback(
    async (inputData: LoginInput | FieldValues) => {
      try {
        await loginMutation({
          variables: {
            input: {
              account: "admin@japan",
              password: inputData.password
            }
          }
        });
        router.push("/admin")
      } catch (err) {
        alert(err);
      }
    }, [loginMutation, router]);

  if(loginLoading){
    return <Loading/>
  }

  return (
    <Container component="main" maxWidth="xs">
      <KeyIcon color="primary" style={{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "40px"
      }} />
      <Typography component="h2" variant="h5" textAlign="center">
        Login
      </Typography>
      <form
        style={{
          marginTop: "50px"
        }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormController
              name="account"
              control={control}
              label="input your account name"
              defaultValue="admin@japan"
              readOnly={true}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <FormController
              name="password"
              control={control}
              label="input your password"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
};

export default Page;