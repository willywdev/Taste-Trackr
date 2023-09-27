import GlobalStyle from "@/GlobalStyle";
import Header from "@/components/Header/Header";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error } = useSWR("/api/restaurants", fetcher);

  function handleSearchValue(value) {
    setSearchValue(value);
  }

  return (
    <>
      <Head>
        <title>Taste Trackr</title>
      </Head>
      <SessionProvider session={session}>
        <GlobalStyle />
        <Header />
        <Component
          {...pageProps}
          restaurantsData={data}
          error={error}
          isLoading={isLoading}
          searchValue={searchValue}
          handleSearchValue={handleSearchValue}
        />
      </SessionProvider>
    </>
  );
}
