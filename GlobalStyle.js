import { Roboto } from "next/font/google";
import { createGlobalStyle } from "styled-components";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #03071e;
        color: white;
        padding: 1rem;
        font-family: ${roboto.style.fontFamily};
        line-height: 1.6;
        font-size: 1.1rem;
    }
    main {
        padding-top: 8.5rem;
    }
`;

export default GlobalStyle;
