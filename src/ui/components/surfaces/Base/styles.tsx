import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ButtonStyle = styled(Button)`
  /* Acesso ao próprio componente.*/
  &.MuiButton-outlined {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

export const BoxDrawer = styled(Box)`
  //background-color: ${({ theme }) => theme.palette.primary.dark};
  .link-image {
    padding: ${({ theme }) => theme.spacing(1.5)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
