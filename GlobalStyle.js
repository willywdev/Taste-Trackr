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
        padding-top: 5.25rem;
    }

    @media (max-width: 768px) {
        body {
            padding: 0.5rem;
            font-size: 1rem;
        }
    }
`;

export default GlobalStyle;
