import { ProfessorInterface } from "@data/@types/professor";
import { ApiService } from "@data/services/ApiService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Router } from "@routes/Routes";

export default function usePesquisaProfessor() {
  const router = useRouter(),
    [search, setSearch] = useState<string>(router.query.search as string),
    [professores, setProfessores] = useState<ProfessorInterface[]>(),
    [timeOutRef, setTimeOutRef] = useState<NodeJS.Timeout>();


  // Executado depois que a tela é montada
  useEffect(() => {
    // then: vai ficar escutando o que a API vai estar executando.
    ApiService.get("/api/professores", { params: { q: search as string } })
      .then(({ data }: AxiosResponse<ProfessorInterface[]>) => {
        setProfessores(data);
      })
      .catch(() => setProfessores([]));
  }, [search]); //[]: array de dependências vazio, só vai ser executado uma única vez.

  function onSearch(value:string) {

    
    // Passar o timeOut anterior pego no setTimeOutRef.
    clearTimeout(timeOutRef); // Cancelar timeOut. --- na primra vez vai estar undefined.
    /* setTimeout: executa uma outra função dentro dela e tudo que estiver lá vai ser executado 
    de acordo com o tempo passado lá dentro, recebe um array de dependências.*/
    const time = setTimeout(() =>{ // Debouncing
      setSearch(value);
      // A cada clique, vai fazer uma nova requisição.
      Router.pesquisaProfessor.push(router, value); // Alterar a URL depois da navegação.
    }, 250); // tempo baseado em milissegundos.

    
    setTimeOutRef(time);
    
    
  }
  function selecionarProfessor(professor: ProfessorInterface){
    // sessionStorage: só pode colocar somente string.
    // Colocar valores bem específicos do próprio projeto.
    sessionStorage.setItem("hyperprof_professor", JSON.stringify(professor))
    // Navegação para a próxima tela
    Router.detalheProfessor.push(router); // Alterar a URL depois da navegação.
  }

  return { professores, onSearch, selecionarProfessor};
}
