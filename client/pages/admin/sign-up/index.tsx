import { useCreateAccountMutation, User } from "../../../../graphql/client";
import React from "react";
import { NextPage } from "next";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import KeyIcon from '@mui/icons-material/Key';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../../../components/Header";


const Page: NextPage = () => {
  const [createAccountMutation] = useCreateAccountMutation();

  const createAccount = React.useCallback(() => {

    //mock data
    const user: User = {
      first: "shotaro",
      last: "kumagai",
      email: "--------------",
      password: "5959"
    };

    createAccountMutation({
      variables: { input: user }
    })
  }, [createAccountMutation])

  const handlCreateAccount = () => {
    createAccount();
  }

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <KeyIcon color="primary" style={{
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
        <form onSubmit={handlCreateAccount}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                id="Name"
                label="First Name"
                autoFocus
                style={{
                  marginTop: "50px"
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                id="Name"
                label="Last Name"
                autoFocus
                style={{
                  marginTop: "50px"
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passward"
                label="Passward"
                type="password"
                id="passward"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              marginTop: "30px"
            }}
          >
            Sign Up
          </Button>
        </form>
      </Container>
    </>
  )
};


export default Page;