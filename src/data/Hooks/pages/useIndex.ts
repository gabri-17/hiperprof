import { getUser } from "@data/services/MeService";
import { Router } from "@routes/Routes";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

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

    useEffect(() =>{
        // Escutar a resposta para fazer a navegação em caso de sucesso
        getUser().then(() => Router.listaDeAlunos.push(router));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // [] para executar apenas uma vez.
    return {setSearch, messageErro, onBuscarProfessor};

}