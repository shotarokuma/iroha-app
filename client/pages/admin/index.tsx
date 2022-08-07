import {
  useGetAssetQuery
} from "../../../graphql//client";
import React from "react";
import { NextPage } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useAdmin } from "../../hooks/admin";
import { AssetCard } from "../../components/AssetCard";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

const Page: NextPage = () => {
  const { data, loading: getAssetLoading, error: queryError } = useGetAssetQuery({
    variables: {
      input: {
        account: "admin@japan"
      }
    },
  });
  const { roots, onClickLogOut } = useAdmin();

  if (getAssetLoading) {
    return <Loading />
  };

  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut} />
      <Container component="main" maxWidth="lg">
        <Grid container spacing={1}>
          {
            data && data.getAsset.map((a, ind) => {
              if (a) {
                return (
                  <Grid item key={ind} xs={3}>
                    <AssetCard assetId={a.assetId} balance={a.balance} />
                  </Grid>
                )
              }
            })
          }
        </Grid>
      </Container>
    </>
  )
};

export default Page;