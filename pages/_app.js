import GlobalStyle from "@/GlobalStyle";
import Header from "@/components/Header/Header";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { data, isLoading, error } = useSWR("/api/restaurants", fetcher);

  function handleLoggedIn() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Component
        {...pageProps}
        isLoggedIn={isLoggedIn}
        restaurantsData={data}
        error={error}
        isLoading={isLoading}
      />
    </>
  );
}
