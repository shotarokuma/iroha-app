import { Role, useGetAssetQuery } from "../../graphql/client";
import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useUser } from "../hooks/user";
import { AssetCard } from "../components/AssetCard";
import Header from "../components/Header";
import Loading from "../components/Loading";

const Page: NextPage = () => {
  const router = useRouter();
  const { asset } = router.query;
  const { roots, onClickLogOut } = useUser();
  const [loading, setLoading] = React.useState<boolean>(false);
  const account = localStorage.getItem("account");
  const { data, loading: getAssetLoading } = useGetAssetQuery({
    variables: {
      input: {
        account: account ?? "",
      },
    },
  });

  React.useEffect(() => {
    if (asset === "true") {
      setLoading(true);
      setTimeout(() => {
        router.reload();
      }, 5000);
    }
  }, []);

  if (loading || getAssetLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut} />
      <Container component="main" maxWidth="lg">
        <Grid container spacing={1}>
          {data &&
            data.getAsset.map((a: any, ind: number) => {
              return (
                <Grid item key={ind} xs={3}>
                  <AssetCard
                    assetId={a.assetId}
                    balance={a.balance}
                    role={Role.User}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Page;
