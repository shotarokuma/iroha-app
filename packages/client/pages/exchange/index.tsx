import { Item } from "../../../graphql/client";
import React from "react";
import { NextPage } from "next";
import Image from "next/image";
// import { useRouter } from "next/router";
import { useUser } from "../../hooks/user";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PaymentIcon from "@mui/icons-material/Payment";
import Header from "../../components/Header";

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
  const { roots, onClickLogOut } = useUser();
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
                  <IconButton aria-label={i.item} color="secondary">
                    <PaymentIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </>
  );
};

export default Page;
