import { Box, CircularProgress, Typography } from "@mui/material";
import { ReactElement } from "react";

// unknown: não há obrigação de inicializar o fetchProps passando o Generics.
interface FetchProps<T = unknown>{
    /* Data tornou-se uma lista genérica: ele pode ser qualquer tipo de 
    dado (exs.: ProfessorInterface, AlunoInterface).*/
    data: T[] | undefined;
    render: (data: T[]) => ReactElement;
    mensage?: string;
    maxLength?: number;
}

// Mesmo tipo de dado do retorno do componente Fetch.
type FetchComponentType = <G>(props: FetchProps<G>) => ReactElement

const Fetch: FetchComponentType = ({data, render, mensage, maxLength}) => {
    if(data){
        // slice: cortar parte da lista.
        const dataFilted = data.slice(0,maxLength);
        if(dataFilted.length === 0) <Typography>{mensage}</Typography>
        return render(dataFilted);    
    }
    return (
        <Box>
            <CircularProgress />
        </Box>

    )
};

export default Fetch;