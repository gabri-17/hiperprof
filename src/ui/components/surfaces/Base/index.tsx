import Link from "@components/navigation/Link";
import UserHeaderMenu from "@components/navigation/UserHeaderMenu";
import { ProfessorInterface } from "@data/@types/professor";
import { ProfessorContext } from "@data/contexts/ProfessorContext";
import { ApiService } from "@data/services/ApiService";
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
import { NextRouter, useRouter } from "next/router";
import { PropsWithChildren, useContext, useState } from "react";
import { BoxDrawer, ButtonStyle } from "./styles";

// props: passar um objeto que vai receber ProfessorInterface.
function LinkLogo({ professor }: { professor?: ProfessorInterface }) {
  return (
    /* Se tem professor (estiver logado) navegar para tela professor, senão para tela 
    home.*/
    <Link href={professor?.id ? "/professor" : "/"}>
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
    router = useRouter(),
    { ProfessorState: professor, ProfessorDispatch } =
      /* tentando acessar o contexto passando o ProfessorContext (vai fazer um get do 
      Professor).*/
      useContext(ProfessorContext);

  async function handleLogout() {
    await ApiService.post(
      "/api/auth/logout",
      // refresh token tem prazo maior de expiração que o token.
      { refresh_token: localStorage.getItem("refresh_token_hiperprof") },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token_hiperprof")}`,
        },
      }
    ).then(() => {
      localStorage.removeItem("token_hiperprof"); // limpar o localStorage.
      localStorage.removeItem("refresh_token_hiperprof");
      ProfessorDispatch(undefined); // limpar os dados do usuário.
      Router.home.push(router);
    });
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
            <HeaderDesktop
              router={router}
              professor={professor}
              onLogout={handleLogout}
            /> // propriedades router passando router.
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
                <HeaderMobile professor={professor} onLogout={handleLogout} />
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

interface HeaderDesktopProps {
  router: NextRouter;
  professor?: ProfessorInterface; // ? : campo nullable (anula essa propriedade).
  onLogout?: () => void;
}

// Desestruturação de router e professor.
function HeaderDesktop({ router, professor, onLogout }: HeaderDesktopProps) {
  const [openMenu, setOpenMenu] = useState(false);
  function onBeTeacher() {
    Router.cadastroProfessor.push(router);
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Como saber se tem professor? Basta passar professor aqui embaixo.*/}
      <LinkLogo professor={professor} />
      {professor?.id ? (
        <>
          <Link href="/professor" color={"inherit"} sx={{ ml: 80 }}>
            Lista de alunos
          </Link>
          <UserHeaderMenu
            isMenuOpen={openMenu}
            onMenuClick={() => setOpenMenu(false)}
            onMenuClose={() => setOpenMenu(false)}
            onClick={() => setOpenMenu(true)}
            handleLogout={onLogout}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
}

interface HeaderMobileProps {
  professor?: ProfessorInterface;
  onLogout?: () => void; // ? : campo opcional.
}

function HeaderMobile({ professor, onLogout }: HeaderMobileProps) {
  return (
    <BoxDrawer>
      <div className="link-image">
        <LinkLogo professor={professor} />
      </div>

      {professor?.id ? (
        <MenuListDrawerLinks>
          <Link href="/professores">Lista de alunos</Link>
          <Link href="/login" sx={{ my: 3 }}>
            Cadastro do professor
          </Link>
          <Link href="/login" onClick={onLogout}>
            Logout
          </Link>
        </MenuListDrawerLinks>
      ) : (
        <MenuListDrawerLinks>
          <Link href="/">HOME</Link>
          <Link href="/login" sx={{ my: 3 }}>
            LOGIN
          </Link>
          <Link href="/professor/cadastro-professor">
            QUERO SER UM PROFESSOR
          </Link>
        </MenuListDrawerLinks>
      )}
    </BoxDrawer>
  );
}

function MenuListDrawerLinks({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: 3,
        mr: 5,
      }}
    >
      {children}
    </Box>
  );
}
