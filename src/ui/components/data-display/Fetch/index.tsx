import { Box, CircularProgress } from "@mui/material";
import { ReactElement } from "react";

interface FetchProps<T = unknown>{ // sem obrigação de inicializá o FetchProps passando o Generics.
    data: T[] | undefined;/* não pode ser somente para ProfessorInterface, pode ser para qualquer outro tipo de dado.*/
    render: (data: T[]) => ReactElement; // função que recebe um array de dados e retorna um elemento React.
}

type FetchComponentType = <G>(props: FetchProps<G>) => ReactElement;

const Fetch = ({data}) =>{ // desestruturação das props
    if(!data){
        return render();
    }
   return (
    <Box>
        <CircularProgress></CircularProgress>
    </Box>
   )
}

export default Fetch;