import { PropsWithChildren } from "react";
// renomeado como MuiLink.
import {LinkProps as MuiLinkProps } from "@mui/material";
import {Link as MuiLink} from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link"; /* nextLink também possui suas 
propriedades.*/

// LinkProps vai herdar as propriedades dos componentes.
interface LinkProps extends MuiLinkProps, NextLinkProps {
  // Forçar uma tipagem para o LinkProps (sobrescrever).
  href: string;
  onClick?: () => void; // ? : não é obrigaória. ---> Pode ser nulo.
  onMouseEnter?: () => void;
  onTouchStart?: () => void;
}

export default function Link({
  children,
  ...props // espalhar propriedades.
}: PropsWithChildren<LinkProps>) {
  // desestruturar para pegar os filhos.
  return (
    <MuiLink component={NextLink} {...props}>
      {children}
    </MuiLink>
  );
}

