import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import client from "../auth/apollo";
import { redirectLogin } from "../auth/admin";
import theme from "../style/theme";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  React.useEffect(() => {
    redirectLogin(router.pathname);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Head>iroha-app</Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
