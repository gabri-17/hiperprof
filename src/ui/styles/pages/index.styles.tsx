import { styled } from "@mui/material/styles";

export const HomeContainer = styled("form")`
  max-width: ${({ theme }) => theme.breakpoints.values.md}px;
  margin: auto; // margem na esquerda e direita automática (distribuição)
`;

export const BoxButtons = styled("div")`
  max-width: ${({ theme }) => theme.breakpoints.values.md}px;
  margin: auto; // centralizar;
  text-align: center;
  margin: ${({theme}) => theme.spacing(2)};
`;
