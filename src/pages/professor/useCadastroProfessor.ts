import { ResponseErrorInterface } from "@data/@types/axios_response";
import { LoginInterface, ResponseLoginInterface } from "@data/@types/login";
import {
  ProfessorCadastroInterface,
  ProfessorErroInterface,
} from "@data/@types/professor";
import { ProfessorContext } from "@data/contexts/ProfessorContext";
import { ApiService } from "@data/services/ApiService";
import { FormSchemaService } from "@data/services/FormSchemaService";
import { getUser } from "@data/services/MeService";
import { Router } from "@routes/Routes";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export default function useCadastroProfessor() {
  const [valuesCadastro, setValuesCadastros] = useState(
      {} as ProfessorCadastroInterface /* {} : ideal é deixar um valor default ou implementar algum tipo 
    de lógica.*/
    ),
    [valuesErroCadastro, setValuesErroCadastro] =
      useState<ProfessorErroInterface>(),
    [loading, setLoading] = useState(false),
    [snackMessage, setSnackMessage] = useState(""),
    router = useRouter(),
    { ProfessorDispatch } = useContext(ProfessorContext);

  async function handleSubmit() {
    // Enviar os dados para cadastro.
    const formValidate = FormSchemaService.cadastroProfessor(valuesCadastro);
    setValuesCadastros(formValidate);
    const isValid =
      Object.keys(formValidate).length === 0; /*Pegar todas as keys do objeto e 
    tranformar em uma lista.*/
    if (isValid && !loading) {
      setLoading(true);
      const data = {
        ...valuesCadastro,
        valor_hora: Number(
          (valuesCadastro.valor_hora as string)
            .replace("R$", "")
            .replace(",", ".")
        ),
      } as ProfessorCadastroInterface;

      // Navegação para tela de lista professores
      await ApiService.post("/api/professores", data)
        .then(async () => {
          setSnackMessage("Professor cadastrado com sucesso!");
          await handleLogin(); // Fazer login quando conseguir cadastrar.
          Router.listaDeAlunos.push(router);
        })
        .catch(
          ({
            response,
          }: AxiosError<ResponseErrorInterface<ProfessorErroInterface>>) => {
            if (response) {
              const { message, errors } = response.data;
              setValuesErroCadastro(errors);
              setSnackMessage(message);
            }
          }
        )
        .finally(() => setLoading(false));
    }
  }

  async function handleLogin() {
    setLoading(true);
    ApiService.post("/api/auth/login", {
      email: valuesCadastro.email,
      password: valuesCadastro.password,
    } as LoginInterface)
      .then(async ({ data }: AxiosResponse<ResponseLoginInterface>) => {
        localStorage.setItem("token_hiperprof", data.token);
        localStorage.setItem("refresh_token_hiperprof", data.refresh_token);
        // Pegar os dados de usuário.
        await handleGetUser(); // Depois que fizer o login corretamente.
      })
      .catch(() => {
        Router.login.push(router);
      })
      .finally(() => setLoading(false));
  }

  async function handleGetUser() {
    await getUser()
      .then(({ data }) => ProfessorDispatch(data))
      .catch(({ response }) => {
        setSnackMessage(
          response?.data.message ??
            // Se der undefined, mostrar esta mensagem.
            "Erro inexperado ao tentar buscar usuário logado."
        );
      });
  }

  return {
    valuesCadastro,
    valuesErroCadastro,
    snackMessage,
    setSnackMessage,
    setValuesCadastros,
    handleSubmit,
    loading,
  };
}
