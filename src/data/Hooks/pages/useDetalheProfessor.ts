import {
  AlunoErrorResponseInterface,
  AlunoInterface,
} from "@data/@types/alunos";
import { ResponseErrorInterface } from "@data/@types/axios_response";
import { ProfessorInterface } from "@data/@types/professor";
import { ApiService } from "@data/services/ApiService";
import { BrowserService } from "@data/services/BrowserService";
import { Router } from "@routes/Routes";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useDetalheProfessor() {
  const router = useRouter(),
    [professor, setProfessor] = useState<ProfessorInterface>(),
    [professores, setProfessores] = useState<ProfessorInterface[]>([]), // ajustar ([]) aqui
    [openDialog, setOpenDialog] = useState<Boolean>(false),
    [aluno, setAluno] = useState<AlunoInterface>({
      // Interface é como se fosse um contrato.
      nome: "",
      data_aula: "",
      email: "",
    }),
    [snackMessage, setSnackMessage] = useState(""),
    [alunoError, setAlunoError] = useState<AlunoErrorResponseInterface>();

  useEffect(() => {
    const data = sessionStorage.getItem("hyperprof_professor");

    if (data) {
      setProfessor(JSON.parse(data)); // transformar Professor em objeto
    } else {
      Router.home.push(router);
    }

    return () => {
      /*Toda vez que se sair da tela de detalhes do professor, simplesmente ele vai remover
      da sessionStorage o professor selecionado.*/
      // Executado quando a tela (componente) for destruído(a).
      sessionStorage.removeItem("hyperprof_professor"); // Remover o professor da sessão.
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getProfessores() {
    await ApiService.get("/professores", { params: router.query.search })
      .then(({ data }: AxiosResponse<ProfessorInterface[]>) => {
        setProfessor;
      })
      .catch(() => setProfessores([]));
  }

  function selecionarProfessor(professor: ProfessorInterface) {
    setProfessor(professor);
    sessionStorage.setItem("hyperprof_professor", JSON.stringify(professor));
    BrowserService.scrolToTop();
  }

  function formatDataToJson(data: string): Date {
    // 09/04/2024 15:00
    // ["09/04/2024", "15:00"] -> Lista: [1° posição, 2° posição]
    // ["09", "04", "2024"]
    // ["15", "00"]
    const [_data, time] = data.split(" "), // fragmentação da data e hora.
      [dia, mes, ano] = _data.split("/"),
      // ?? se for undefined, colocar uma  lista vazia: [].
      // time?: se der algum tipo de erro.
      [hora, minuto] = time?.split(":") ?? [];
    const newDate = new Date(`${mes} ${dia} ${ano} ${hora}: ${minuto} UTC`);
    return newDate;
  }

  async function handleSubmit() {
    // facilitar a tipagem.
    const newDate = {
      ...aluno,
      data_aula: formatDataToJson(aluno.data_aula as string),
    } as AlunoInterface;
    // ! : quer dizer que tem um dado (professor).
    await ApiService.post(`/api/professores/${professor!.id}/alunos`, newDate)
      .then(() => {
        // Esperar
        setOpenDialog(false);
        setAluno({ data_aula: "", email: "", nome: "" });
      })
      .catch(
        ({
          response,
        }: AxiosError<ResponseErrorInterface<AlunoErrorResponseInterface>>) => {
          if (response) {
            setAlunoError(response.data.errors);
            setSnackMessage(response.data.message);
          }
        }
      );
    setSnackMessage("Aula agendada com sucesso!");
  }

  return {
    professor,
    professores,
    selecionarProfessor,
    openDialog,
    setOpenDialog,
    setAluno,
    snackMessage,
    handleSubmit,
    setSnackMessage,
    alunoError,
    setAlunoError,
  };
}
