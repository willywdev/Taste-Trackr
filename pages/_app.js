import GlobalStyle from "@/GlobalStyle";
import Header from "@/components/Header/Header";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [searchValue, setSearchValue] = useState("");

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
          searchValue={searchValue}
          handleSearchValue={handleSearchValue}
        />
      </SessionProvider>
    </>
  );
}
