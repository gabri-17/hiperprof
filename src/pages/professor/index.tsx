import Fetch from "@components/data-display/Fetch";
import PageTitle from "@components/data-display/PageTitle";
import { AlunoInterface } from "@data/@types/alunos";
import { TextFormatService } from "@data/services/TextFormatService";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Icon,
  Typography,
} from "@mui/material";
import { AccordionStyled } from "@styles/pages/professor/index.styles";
import usePainelProfessor from "./usePainelProfessor";

export default function PainelProfessorPage() {
  const { alunos, expanded, setExpanded } = usePainelProfessor();
  return (
    <>
      <PageTitle title="Lista de alunos" />
      <Fetch
        data={alunos}
        mensage="Nenhum aluno agendado"
        render={(alunos) => {
          return (
            <AlunosList
              alunos={alunos}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          );
        }}
      />
    </>
  );
}

interface AlunosListProps {
  alunos: AlunoInterface[];
  setExpanded: (value: string) => void;
  expanded: string;
}

function AlunosList({ alunos, expanded, setExpanded }: AlunosListProps) {
  return (
    <>
      {alunos.map((aluno) => {
        return (
          <Box key={aluno.id} sx={{ my: 5 }}>
            <AccordionStyled
              expanded={expanded === aluno.id.toString()}
              onChange={(_, b) =>
                b ? setExpanded(aluno.id.toString()) : setExpanded("")
              }
            >
              <AccordionSummary>
                <Typography variant="h6">{aluno.nome}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h5">
                  <Icon>person</Icon>
                  {aluno.nome}
                </Typography>
                <Typography sx={{ mb: 2, mt: 5 }}>
                  <Icon>calendar_month</Icon>
                  {
                    TextFormatService.dateFromText(
                      aluno.data_aula as string
                    ) as string
                  }
                </Typography>
                <Typography>
                  <Icon>email</Icon>
                  {aluno.email}
                </Typography>
              </AccordionDetails>
            </AccordionStyled>
          </Box>
        );
      })}
    </>
  );
}
