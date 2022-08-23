import {
  Role,
  ChargeAssetInput,
  useGetAssetQuery,
  useChargeAssetMutation,
} from "../../../graphql//client";
import React from "react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { useAdmin } from "../../hooks/admin";
import { AssetCard } from "../../components/AssetCard";
import Header from "../../components/Header";
import FormController from "../../components/FormController";
import Loading from "../../components/Loading";

const Page: NextPage = () => {
  const { data, loading: getAssetLoading } = useGetAssetQuery({
    variables: {
      input: {
        account: "admin@japan",
      },
    },
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = (): void => {
    setOpen(false);
  };
  const [target, setTarget] = React.useState<string | null>(null);
  const { roots, onClickLogOut } = useAdmin();
  const [chargeAssetMutation, { loading: chargeAssetLoading }] =
    useChargeAssetMutation();
  const { handleSubmit, control } = useForm<ChargeAssetInput>();

  const getTarget = (): string | null => target;

  const onSubmit = React.useCallback(
    async (inputData: Partial<ChargeAssetInput>) => {
      const assetId = getTarget();
      if (!inputData.amount || !assetId) return;
      try {
        await chargeAssetMutation({
          variables: {
            input: {
              asset: assetId,
              amount: inputData.amount,
            },
          },
        });
        alert("charged your bit coin");
        setOpen(false);
      } catch (err) {
        alert(err);
      }
    },
    [chargeAssetMutation, getTarget]
  );

  if (getAssetLoading || chargeAssetLoading) {
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
                    role={Role.Admin}
                    setTarget={setTarget}
                    setOpen={setOpen}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Edit your data"}</DialogTitle>
        <form>
          <DialogContent
            style={{
              width: 500,
            }}
          >
            <FormController
              name="amount"
              control={control}
              label="input amount of bitcoin you want to charge"
              fullWidth={true}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
            >
              send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Page;
