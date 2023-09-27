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
    setSearchValue(value.toLowerCase());
  }

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
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
