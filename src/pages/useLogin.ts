import { ResponseErrorInterface } from "@data/@types/axios_response";
import {
  LoginErroInterface,
  LoginInterface,
  ResponseLoginInterface,
} from "@data/@types/login";
import { ProfessorContext } from "@data/contexts/ProfessorContext";
import { ApiService } from "@data/services/ApiService";
import { getUser } from "@data/services/MeService";
import { Router } from "@routes/Routes";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";

export default function useLogin() {
  const [valuesLogin, setValuesLogin] = useState<LoginInterface>(
      {} as LoginInterface
    ),
    [messageErro, setMessageErro] = useState<LoginErroInterface>(),
    [loading, setLoading] = useState(false),
    [snackMessage, setSnackMessage] = useState(""),
    router = useRouter(),
    {ProfessorDispatch} = useContext(ProfessorContext);

  function handleLogin(event: FormEvent) {
    event.preventDefault(); // alterar o comportamento padrão.
  }

  if (!loading) {
    setLoading(true); // vai começar a carregar.
    ApiService.post("/api/auth/login", valuesLogin)
      .then(async ({ data }: AxiosResponse<ResponseLoginInterface>) => {
        localStorage.setItem("token_hiperprof", data.token);
        localStorage.setItem("refresh_token_hiperprof", data.refresh_token);
        await handleGetUser(); // quando fizer o login vai adicionar ao contexto.
        Router.listaDeAlunos.push(router); // redirecionamento.
      })
      .catch(
        ({
          response,
        }: AxiosError<ResponseErrorInterface<LoginErroInterface>>) => {
          if (response) {
            const { message, errors } = response.data;
            setMessageErro(errors);
            setSnackMessage(
              message ?? ""
            ); /* ?? : se não vier o campo message vai apresentar 
            a string vazia.*/
          }
        }
      )
      .finally(() => {
        // Sempre vai finalizar o loading independente da condição.
        setLoading(false);
      });
  }

  async function handleGetUser(){
    await getUser().then(({data}) =>{
      // Pegar os dados do usuário.
      ProfessorDispatch(data);
    }).catch(()=>{
      setSnackMessage("Erro inesperado ao tentar buscar o usuário logado!")
    });
  }

  return {
    setValuesLogin,
    messageErro,
    handleLogin,
    loading,
    snackMessage,
    setSnackMessage,
  };
}
