import {
  Item,
  useGetAssetQuery,
  useExchangeAssetMutation,
} from "../../../graphql/client";
import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "../../hooks/user";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import PaymentIcon from "@mui/icons-material/Payment";
import Header from "../../components/Header";
import Loading from "../../components/Loading";

const itemData: Item[] = [
  {
    img: "/img/item1.jpg",
    item: "Candy",
    price: "1.0",
  },
  {
    img: "/img/item2.png",
    item: "Alchool",
    price: "10.0",
  },
  {
    img: "/img/item3.jpg",
    item: "Carot",
    price: "10.0",
  },
  {
    img: "/img/item4.jpg",
    item: "Lettuce",
    price: "10.0",
  },
  {
    img: "/img/item5.jpg",
    item: "Poteato",
    price: "10.0",
  },
  {
    img: "/img/item6.jpg",
    item: "Travel",
    price: "100",
  },
];

const Page: NextPage = () => {
  const root = useRouter();
  const { roots, onClickLogOut } = useUser();
  const account = localStorage.getItem("account");
  const { data, loading: getAssetLoading } = useGetAssetQuery({
    variables: {
      input: {
        account: account ?? "",
      },
    },
  });
  const [exchangeMuatation, { loading: exchangeLoading }] =
    useExchangeAssetMutation();
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [selectedAsset, setSelectedAsset] = React.useState<string | null>();

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedAsset((e.target as HTMLInputElement).value);
  };

  const handleClose = (): void => {
    setSelectedItem(null);
    setOpen(false);
  };

  const handleSelect = (item: Item): void => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleExchange = async (): Promise<void> => {
    if (!selectedAsset || !selectedItem || !account) {
      return;
    }
    try {
      await exchangeMuatation({
        variables: {
          input: {
            account,
            asset: selectedAsset,
            item: selectedItem.item,
            price: selectedItem.price,
          },
        },
      });
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      alert(`you got a ${selectedItem.item}`);
      await root.push("/?asset=true");
    } catch (err) {
      alert(err);
    }
  };

  if (getAssetLoading || exchangeLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header roots={roots} onClickLogOut={onClickLogOut} />
      <Container component="main" maxWidth="lg">
        <ImageList>
          <ImageListItem key="Subheader" cols={2}>
            <Typography
              component="h2"
              variant="h5"
              textAlign="center"
              style={{
                marginTop: "30px",
              }}
            >
              Select your item
            </Typography>
          </ImageListItem>
          {itemData.map((i) => (
            <ImageListItem
              key={i.img}
              style={{ width: "100%", height: "400px", position: "relative" }}
            >
              <Image src={i.img} alt={i.item} layout="fill" loading="lazy" />
              <ImageListItemBar
                title={i.item}
                subtitle={i.price + " pt"}
                actionIcon={
                  <IconButton
                    aria-label={i.item}
                    color="secondary"
                    onClick={() => handleSelect(i)}
                  >
                    <PaymentIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {"please select your asset for paying the item"}
        </DialogTitle>
        <DialogContent
          style={{
            width: 500,
          }}
        >
          <FormControl>
            <FormLabel>Asset</FormLabel>
            <RadioGroup
              aria-labelledby="select your asset"
              value={selectedAsset}
              onChange={handleRadioClick}
            >
              {data &&
                data.getAsset.map((a, ind) => (
                  <FormControlLabel
                    key={ind}
                    value={a?.assetId}
                    control={<Radio />}
                    label={a?.assetId}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleExchange}>
            Pay
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Page;
