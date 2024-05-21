import UserProfileAvatar from "@components/data-display/UserProfileAvatar";
import { RouterTypeof } from "@data/@types/router";
import { ProfessorContext } from "@data/contexts/ProfessorContext";
import {
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Router } from "@routes/Routes";
import { useRouter } from "next/router";
import { useContext, useMemo, useRef } from "react";
import { UserHeaderMenuContainer, UserMenu } from "./styles";

interface UserHeaderMenuProps {
  isMenuOpen?: boolean;
  onClick?: () => void;
  onMenuClick: (event: React.MouseEvent) => void;
  onMenuClose: (event: React.MouseEvent) => void;
  handleLogout?: () => void;
}

export default function UserHeaderMenu({
  isMenuOpen = false,
  onClick,
  onMenuClick,
  onMenuClose,
  handleLogout,
}: UserHeaderMenuProps) {
  const _router = useRouter(),
    { ProfessorState: professor } = useContext(ProfessorContext),
    containerRef = useRef(null),
    listMenu = useMemo(() => {
      return handleMenuRouter();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [professor]);

  // Retornar uma lista com os elementos da rota.
  function handleMenuRouter() {
    /**
     * const data = {nome: "deaad", idade:""}
     * console.log(data.idade) //depende da versão do ECMAScript.
     * console.log(data['idade']) //depende da versão do ECMAScript.
     */

    return Object.keys(Router)
      .map((value) => {
        const _value = value as RouterTypeof;
        return {
          nome: value.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase(),
          router: Router[_value] /* Renderização pela posição do elemento 
        dinamicamente. */,
        };
      })
      .filter(({ router }) => {
        /*Se tiver icone, apresenta; senão não apresenta. */
        return router.icon;
      }); // criação de uma lista de strings com cada Rota.
  }

  return (
    <UserHeaderMenuContainer ref={containerRef}>
      <UserProfileAvatar professor={professor} onClick={onClick} />
      {/* anchorEl: definir que UserMenu vai pegar a referência do UserHeaderMenuContainer. */}
      <UserMenu
        open={isMenuOpen}
        anchorEl={containerRef.current}
        onClose={onMenuClose}
        onClick={onMenuClick}
        //Mudar nesse ponto, se necessário.
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {listMenu.map(({ nome, router }) => {
          return (
            // key={nome} => nome vai ser único.
            <ListItem
              key={nome}
              onClick={() => {
                router.push(_router);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Icon>{router.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={nome} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <Icon>logout</Icon>
            </ListItemIcon>
            <ListItemText primary={"logout"} />
          </ListItemButton>
        </ListItem>
        {/* disablePadding: para não ter padding no ListItem.*/}
      </UserMenu>
    </UserHeaderMenuContainer>
  );
}
