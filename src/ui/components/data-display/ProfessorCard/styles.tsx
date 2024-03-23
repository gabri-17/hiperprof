import { styled } from "@mui/material";

export const ListStyled = styled("ul")`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // vai pegar o máximo de tamanho possível na tela.
    grid-auto-rows: 500px;
    padding: 0;
    gap: ${({theme}) => theme.spacing(5)};

    ${({theme}) => theme.breakpoints.down("md")}{
        grid-template-columns: repeat(2, 1fr);
    }

    ${({theme}) => theme.breakpoints.down("sm")}{
        grid-template-columns: repeat(1, 1fr);
    }
`;


export const BoxCardItemStyled = styled("li")`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
    
`;

export const BoxAvatarStyled = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 400px;
    background-color: ${({theme}) => theme.palette.grey[500]};
`;

export const ImageStyled = styled("img")`
    // Pegar todo o conteúdo pai (BoxAvatarStyled -> possui 400px).
    width: 100%;

`;

export const BoxContainsStyled = styled("div")`
    height: 400px;
    background-color: ${({theme}) => theme.palette.primary.main};
    padding: ${({theme}) => theme.spacing(4)};
    text-align: center;
    /* Cor de contraste é como os textos vão ficar referente ao 
    background, ou seja, se o background for preto vai ficar branco.*/
    color: ${({theme})=> theme.palette.primary.contrastText};
    
    .text-container .descricao{
        overflow: hidden;
        text-overflow: ellipsis; // criar três pontinhos quando não couber mais na tela.
        display: -webkit-box;
        -webkit-line-clamp: 3; // definir o máximo de linhas do texto.
        -webkit-box-orient: vertical;
    }
`;