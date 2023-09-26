import GlobalStyle from "@/GlobalStyle";
import Header from "@/components/Header/Header";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function handleLoggedIn() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} isLoggedIn={isLoggedIn} />
    </>
  );
}
