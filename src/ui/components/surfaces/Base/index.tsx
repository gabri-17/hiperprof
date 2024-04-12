import Link from "@components/navigation/Link";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  Icon,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Router } from "@routes/Routes";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";
import { BoxDrawer, ButtonStyle } from "./styles";

function LinkLogo() {
  return (
    <Link href="/">
      <img src="/logo.png" alt="hiperprof" />
    </Link>
  );
}

export default function Base({ children }: PropsWithChildren) {
  const {
      breakpoints,
      palette: { common },
    } = useTheme(),
    isSmDevice = useMediaQuery(breakpoints.up("sm")),
    [isOpenDrawer, setIsOpenDrawer] = useState(false),
    router = useRouter();

  function onBeTeacher() {
    Router.cadastroProfessor.push(router);
  }
  return (
    <Box
      sx={{
        bgcolor: common.white,
        height: "100%",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      {/* Elementos com position static não são afetados por deslocamentos e 
            permanecem no fluxo normal do documento.*/}
      <AppBar position="static">
        <Toolbar component={Container}>
          {isSmDevice ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link href="/">
                <LinkLogo />
              </Link>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link href="/" color={"inherit"}>
                  HOME
                </Link>
                <Link href="/login" color={"inherit"} sx={{ ml: 5, mr: 5 }}>
                  LOGIN
                </Link>
                <ButtonStyle variant="outlined" onClick={onBeTeacher}>
                  QUERO SE UM PROFESSOR
                </ButtonStyle>
              </Box>
            </Box>
          ) : (
            <>
              {/* inherit: herdar a cor.*/}
              <IconButton
                color={"inherit"}
                sx={{ mr: 2 }}
                onClick={() => setIsOpenDrawer(true)}
              >
                <Icon>menu</Icon>
              </IconButton>
              <Drawer
                open={isOpenDrawer}
                onClick={() => setIsOpenDrawer(false)}
                onClose={() => setIsOpenDrawer(false)}
              >
                <BoxDrawer>
                  <div className="link-image">
                    <LinkLogo />
                  </div>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      ml: 3,
                      mr: 3,
                    }}
                  >
                    <Link href="/">HOME</Link>
                    <Link href="/login" sx={{ my: 3 }}>
                      LOGIN
                    </Link>
                    <Link href="/professor/cadastro-professor">
                      QUERO SER UM PROFESSOR
                    </Link>
                  </Box>
                </BoxDrawer>
              </Drawer>
              <Link href="/">
                <LinkLogo />
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* Component: vai se comportar como uma tag main. */}
      <Container component={"main"}>{children}</Container>
    </Box>
  );
}
