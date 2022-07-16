import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import client from '../apollo';




const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <ApolloProvider client={client}>
      <Head>iroha-app</Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
