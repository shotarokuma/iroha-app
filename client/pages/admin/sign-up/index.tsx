import {
  CreateAccountInput,
  useCreateAccountMutation
} from "../../../../graphql/client";
import React from "react";
import { NextPage } from "next";
import { useRouter } from 'next/router';
import { useForm, FieldValues } from "react-hook-form";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAdmin } from "../../../hooks/admin";
import Header from "../../../components/Header";
import FormController from "../../../components/FormController";
import Loading from "../../../components/Loading";


const Page: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<CreateAccountInput | FieldValues>();
  const [createAccountMutation, { loading: createAccountLoading, error: mutationError }] = useCreateAccountMutation();
  const { roots, onClickLogOut }  = useAdmin();

  const onSubmit = React.useCallback(
    async (inputData: CreateAccountInput | FieldValues) => {
      try {
        await createAccountMutation({
          variables: {
            input: {
              email: inputData.email,
              first: inputData.first,
              last: inputData.last,
              password: inputData.password
            }
          }
        });
        alert("creates an account and sent Email for the user");
        router.push("/admin");
      } catch (err) {

        alert(err);
      }
    }, [createAccountMutation, router]);

  if(createAccountLoading){
    return <Loading/>
  }


  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut}/>
      <Container component="main" maxWidth="xs">
        <AccountCircleIcon color="primary" style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "40px"
        }} />
        <Typography component="h2" variant="h5" textAlign="center" style={{
          marginTop: "30px"
        }}>
          Signup
        </Typography>
        <form
          style={{
            marginTop: "50px"
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormController
                name="first"
                control={control}
                label="input client's first name"
              />
            </Grid>
            <Grid item xs={6}>
              <FormController
                name="last"
                control={control}
                label="input client's last name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormController
                name="email"
                control={control}
                label="input client's email"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormController
                name="password"
                control={control}
                label="input client's password"
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  )
};


export default Page;