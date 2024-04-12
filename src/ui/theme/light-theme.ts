import { createTheme } from "@mui/material";

// Passar objeto de configuração.
const theme = createTheme({
  palette: {
    primary: {
      light: "#9661ff",
      main: "#6b2aee",
      dark: "#581ecd",
    },
    text: {
      primary: "#707070",
      secondary: "#9b9b9b",
    },
    error: {
      //Precisa-se somente configurar a cor main (sem precisar dark e light).
      main: "#fc3c00",
    },
    warning: {
      main: "#fca600",
    },
    success: {
      main: "#00d34d",
    },
    grey: {
      50: "#fafafa",
      100: "#f0f0f0",
      200: "#d7d9dd",
      300: "#b3b4b8",
      400: "#989898",
    },
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "Poppins, Robot, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        //Acessar a raiz de todos os botões.
        root: {
          textTransform: "uppercase",
          borderWidth: "2px",
          ":hover": {
            borderWidth: "2px",
          },
        },
      },
      //Passar uma lista de configuração para ver como o componente vai variar .
      variants: [
        //Objeto de configuração.
        {
          // Criação de regras para fazer a estilização.
          props: {
            variant: "contained",
          },
          style: {
            padding: "16px 40px",
            backgroundColor: "#9661ff",
          },
        },
        {
          props: {
            // Funcionar para todos os elementos que contenham estas características.
            variant: "outlined",
            color: "inherit", //herdar a cor.
          },
          style: {
            ":hover": {
              backgroundColor: "#9661ff",
            },
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          //É um objeto js deve ser passado dentro de string
          ":hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 39px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(90deg, rgba(107,42,238,1)0%, rgba(2,0,36,1)100%)",
        },
      },
    },
  },
});

export default theme;
