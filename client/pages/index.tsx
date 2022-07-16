import { useTestQueryQuery } from '../../graphql/client';
import React from 'react';
import { NextPage } from 'next'

const Home: NextPage = () => {
  const { data, loading, error } = useTestQueryQuery({
     variables: {
         name: "test"
     },
  });
  return (
    <>
      <h1>test</h1>
    </>
  )
}

export default Home
