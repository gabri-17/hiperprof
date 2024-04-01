import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// Como se fosse uma div, mas tem acesso a recursos do prórpio MATERIAL ui.
export const BoxCardProfessor = styled(Box)`
  display: grid;
  grid-template-columns: 300px 1fr;
  margin: auto;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
  }
`;

export const BoxImage = styled(Box, {
  // Se passar uma configuração que no HTML, as propriedades não existam para evitar bugs.
  shouldForwardProp: (prop) => prop !== "foto", // Ignora a propriedade foto do componente BoxImage.
})<{ foto?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: no-repeat center/cover
    ${({ foto }) => `url(${foto ?? "/user.svg"})`};
  height: 100%;
  border-radius: ${({ theme }) => theme.spacing(1, 0, 0, 1)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    height: 300px;
    border-radius: ${({ theme }) => theme.spacing(0, 1, 1, 0)};
  }
`;

export const BoxDescription = styled("div")`
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background-color: ${({ theme }) => theme.palette.primary.main};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.spacing(0, 1, 1, 0)};

  .box_direita,
  .box_esquerda {
    height: 100%;
    padding: ${({ theme }) => theme.spacing(5)};
  }

  .box_direita {
    text-align: center;
  }

  .box_esquerda {
    .descricao {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing};

    .box_direita,
    .box_esquerda {
      height: 100%;
      padding: ${({ theme }) => theme.spacing(3)};
    }
  }

  .MuiButton-root {
    padding: ${({ theme }) => theme.spacing(1, 3)};
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    border-radius: ${({ theme }) => theme.spacing(0, 0, 1, 1)};
  }
`;
