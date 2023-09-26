import GlobalStyle from "@/GlobalStyle";
import Header from "@/components/Header/Header";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(true);
  const { data, isLoading, error } = useSWR("/api/restaurants", fetcher);

  function handleSearchClicked() {
    setIsSearchClicked(!isSearchClicked);
  }

  function handleLoggedIn() {
    setIsLoggedIn(!isLoggedIn);
  }

  function handleSearchValue(value) {
    setSearchValue(value);
  }

  return (
    <>
      <Head>
        <title>Taste Trackr</title>
      </Head>
      <GlobalStyle />
      <Header
        handleSearchClicked={handleSearchClicked}
        isSearchClicked={isSearchClicked}
        handleSearchValue={handleSearchValue}
      />
      <Component
        {...pageProps}
        isLoggedIn={isLoggedIn}
        restaurantsData={data}
        error={error}
        isLoading={isLoading}
        searchValue={searchValue}
      />
    </>
  );
}
