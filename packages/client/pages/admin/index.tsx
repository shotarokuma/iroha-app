import {
  Role,
  ChargeAssetInput,
  SendingAssetInput,
  useGetAssetQuery,
  useChargeAssetMutation,
  useSendingAssetMutation,
} from "../../../graphql//client";
import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Container from "@mui/material/Container";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
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
  const router = useRouter();
  const { asset } = router.query;
  const [loading, setLoading] = React.useState<boolean>(false);
  const { data, loading: getAssetLoading } = useGetAssetQuery({
    variables: {
      input: {
        account: "admin@japan",
      },
    },
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<0 | 1>(0);
  const handleClose = (): void => {
    setOpen(false);
  };
  const [target, setTarget] = React.useState<string | null>(null);
  const { roots, onClickLogOut } = useAdmin();
  const [chargeAssetMutation, { loading: chargeAssetLoading }] =
    useChargeAssetMutation();
  const [sendingAssetMutation, { loading: SendingAssetLoading }] =
    useSendingAssetMutation();
  const { handleSubmit, control } = useForm<ChargeAssetInput>();
  const { handleSubmit: handleTransferSubmit, control: transferControl } =
    useForm<SendingAssetInput>();

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
        setLoading(true);
        setOpen(false);
        setTimeout(() => {
          router.reload();
        }, 5000);
      } catch (err) {
        alert(err);
      }
    },
    [chargeAssetMutation, getTarget]
  );

  const onTransferSubmit = React.useCallback(
    async (inputData: SendingAssetInput) => {
      try {
        const assetId = getTarget();
        if (!assetId) return;
        await sendingAssetMutation({
          variables: {
            input: {
              account: inputData.account,
              asset: assetId,
              amount: inputData.amount,
            },
          },
        });
        setOpen(false);
      } catch (err) {
        alert(err);
      }
    },
    [sendingAssetMutation, getTarget]
  );

  React.useEffect(() => {
    if (asset === "true") {
      setLoading(true);
      setTimeout(() => {
        router.reload();
      }, 5000);
    }
  }, []);

  if (getAssetLoading || chargeAssetLoading || SendingAssetLoading || loading) {
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
        {form === 0 ? (
          <>
            <DialogTitle>
              {"input amount of bitcoin you want to charge"}
            </DialogTitle>
            <form>
              <DialogContent
                style={{
                  width: 500,
                }}
              >
                <FormController
                  name="amount"
                  control={control}
                  label="amount of bitcoin"
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
          </>
        ) : (
          <>
            <DialogTitle>
              {
                "select the account into whom you transfer bitcoins and amount of it"
              }
            </DialogTitle>
            <form>
              <DialogContent
                style={{
                  width: 500,
                }}
              >
                <div>
                  <FormController
                    name="account"
                    control={transferControl}
                    label="input account name"
                    fullWidth={true}
                  />
                </div>
                <div style={{ marginTop: 20 }}>
                  <FormController
                    name="amount"
                    control={transferControl}
                    label="amount of bitcoin"
                    fullWidth={true}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleTransferSubmit(onTransferSubmit)}
                  variant="contained"
                  color="primary"
                >
                  send
                </Button>
              </DialogActions>
            </form>
          </>
        )}
        <BottomNavigation
          showLabels
          value={form}
          onChange={(event, newValue: 0 | 1) => {
            setForm(newValue);
          }}
        >
          <BottomNavigationAction
            label="Charge"
            icon={<CurrencyBitcoinIcon />}
          />
          <BottomNavigationAction
            label="Transfer"
            icon={<CurrencyExchangeIcon />}
          />
        </BottomNavigation>
      </Dialog>
    </>
  );
};

export default Page;
