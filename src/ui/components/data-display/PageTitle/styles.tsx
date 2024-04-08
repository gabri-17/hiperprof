import { Typography, TypographyProps } from '@mui/material';
import {styled} from '@mui/material/styles';

/* Criação de uma div e passando para a constante e por meio dele vai ser possível utilizar no 
componente.*/
export const PageTitleContainer = styled('div')`
    // Função styled traz acesso ao tema da aplicação.
    margin: ${({theme}) => theme.spacing(5,0)}; /*desestruturação do theme e cálculos na base 8 para espaçamento.*/
    text-align: center;

`;

export const PageTitleStyled = styled((props) => (
    <Typography variant='h3' component={'h2'} {...props}/>
))<TypographyProps>`
    text-transform: uppercase;
    font-weight: bold;
    
    // Quando estiver abaixo do medium device.
    ${({theme}) => theme.breakpoints.down('md')}{
        font-size: ${({theme}) => theme.typography.body1.fontSize};
    }
`;

export const PageSubtitleStyled = styled((props) => (
    <Typography  variant='body1' component={"h3"} {...props}/>
))<TypographyProps>`
    color: ${({theme}) =>  theme.palette.text.primary};
    text-transform: lowercase;
    ${({theme}) => theme.breakpoints.down('md')}{
        font-size: ${({theme}) => theme.typography.body1.fontSize};
    }
`;