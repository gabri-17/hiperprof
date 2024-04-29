import { AlunoInterface } from "@data/@types/alunos";
import { ApiService } from "@data/services/ApiService";
import { Router } from "@routes/Routes";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

export default function usePainelProfessor() {
  const [alunos, setAlunos] = useState<AlunoInterface[]>(),
    router = useRouter(),
    [expanded, setExpanded] = useState("");

  useEffect(() => {
    ApiService.get("/api/professores/alunos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_hiperprof")}`,
      },
    })
      // Sucesso
      .then(({ data }: AxiosResponse<AlunoInterface[]>) => {
        setAlunos(data);
      })
      .catch(() => {
        Router.login.push(router);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { alunos, expanded, setExpanded };
}
