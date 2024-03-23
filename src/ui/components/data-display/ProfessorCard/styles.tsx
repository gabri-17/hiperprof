import { styled } from "@mui/material";


export const BoxCardStyled = styled("div")`
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
    background-color: ${({theme}) => theme.palette.grey[100]};
`;

export const ImageStyled = styled("img")`
    // Pegar todo o conteúdo pai (BoxAvatarStyled -> possui 400px).
    width: 100%;

`;

export const BoxContainsStyled = styled("div")`
    height: 400px;
    background-color: ${({theme}) => theme.palette.primary.main};
    padding: 0;
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