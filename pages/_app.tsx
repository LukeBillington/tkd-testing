import { AppProps } from "next/app";
import { globalStyles } from "../shared/styles";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => (
  <>
    {globalStyles}
    <Component {...pageProps} />
  </>
);

export default App;
