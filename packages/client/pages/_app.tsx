import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import client from "../auth/apollo";
import { Auth } from "../auth/admin";
import theme from "../style/theme";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Head>iroha-app</Head>
      <ThemeProvider theme={theme}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
