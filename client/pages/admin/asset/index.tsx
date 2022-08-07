import {
  CreateAssetInput,
  useCreateAssetMutation
} from "../../../../graphql/client";
import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from  "@mui/material/Button";
import Header from "../../../components/Header";
import { useAdmin } from "../../../hooks/admin";
import FormController from "../../../components/FormController";
import Loading from "../../../components/Loading";

const Page: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<CreateAssetInput>();
  const [createAssetMutation, { loading: createAssetLoading, error: mutationError }] = useCreateAssetMutation();
  const { roots, onClickLogOut } = useAdmin();

  const onSubmit = React.useCallback(
    async(inputData: CreateAssetInput) => {
      try{
        await createAssetMutation({
          variables: {
            input:{
              asset:inputData.asset
            }
          }
        })
        alert("created new bit coin")
        router.push("/admin");
      }catch(err){
        alert(err);
      }
    },[createAssetMutation, router])

  if (createAssetLoading) {
    return <Loading />
  }

  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut} />
      <Container component="main" maxWidth="xs">
        <MonetizationOnIcon color="secondary" style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "40px"
        }} />
        <Typography component="h2" variant="h5" textAlign="center" style={{
          marginTop: "30px"
        }}>
          Create your bit coin
        </Typography>
        <form
          style={{
            marginTop: "50px"
          }}
        >
          <FormController
            name="asset"
            control={control}
            label="input your bitcoin's name"
            fullWidth={true}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            style={{
              marginTop: "30px"
            }}
          >
            Create
          </Button>
        </form>
      </Container>
    </>
  )
};


export default Page;