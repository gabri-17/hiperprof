import { Router } from "@routes/Routes";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function useIndex(){
    const router = useRouter(),
    [search, setSearch] = useState<string>(""), // js já identifica que é uma constante também.
    [messageErro, setMessageErro] = useState<string>("");


    function onBuscarProfessor(event: FormEvent){
        event.preventDefault(); // não vai navegar para nenhum lugar.
        if(search.length >=3){
            Router.pesquisaProfessor.push(router, search);
        }
        else{
            setMessageErro("Digite pelo menos 3 caracteres");
        }
    }
    return {setSearch, messageErro, onBuscarProfessor};

}