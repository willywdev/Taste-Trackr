import GlobalStyle from "@/GlobalStyle";
import Header from "@/components/Header/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
