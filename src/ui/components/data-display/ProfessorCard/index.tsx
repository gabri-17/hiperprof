import { Button, Typography } from "@mui/material";
import {
  BoxAvatarStyled,
  BoxCardStyled,
  BoxContainsStyled,
  ImageStyled,
} from "./styles";

export default function ProfessorCard() {
  return (
    <BoxCardStyled>
      <BoxAvatarStyled>
        <ImageStyled src="https://github.com/gabri-17.png" alt="" />
      </BoxAvatarStyled>
      <BoxContainsStyled>
        <div className="text-container">
          <Typography variant="h6" className="descricao" paragraph>
            Nome
          </Typography>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            className="descricao"
            variant="body2"
            paragraph
          >
            Descrição Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, a minima, provident modi optio rem tempore rerum officiis assumenda dolores, cumque expedita earum aperiam possimus qui incidunt quibusdam impedit quam.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae laborum possimus voluptates praesentium dolores alias, quidem iste deleniti quasi beatae ut, molestias, voluptate quaerat. Cumque doloremque expedita voluptatem ad. Laboriosam.
          </Typography>
        </div>
        {/* color: 'inherit' -> herdar a cor da tela.*/}
        <Button variant="outlined" color="inherit" onClick={() =>{}}>
          Ver detalhes
        </Button>
      </BoxContainsStyled>
    </BoxCardStyled>
  );
}
