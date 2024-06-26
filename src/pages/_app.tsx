import Base from "@components/surfaces/Base";
import { ProfessorProvider } from "@data/contexts/ProfessorContext";
import { ThemeProvider } from "@emotion/react";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import theme from "ui/theme/light-theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    //Para acessar em toda a aplicação é preciso passar o tema como pai de todos os componentes.
    <ThemeProvider theme={theme}> 
      <ProfessorProvider>
        <Base>
          <Component {...pageProps} />
        </Base>
      </ProfessorProvider>
    </ThemeProvider>
  );
}
