import GlobalStyle from "@/GlobalStyle";
import Header from "@/components/Header/Header";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [title, setTitle] = useState("Taste Trackr");
  const { data, isLoading, error } = useSWR("/api/restaurants", fetcher);

  function handleLoggedIn() {
    setIsLoggedIn(!isLoggedIn);
  }

  function handleSetTitle(newTitle) {
    setTitle(newTitle);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <GlobalStyle />
      <Header />
      <Component
        {...pageProps}
        isLoggedIn={isLoggedIn}
        restaurantsData={data}
        error={error}
        isLoading={isLoading}
        setTitle={handleSetTitle}
      />
    </>
  );
}
