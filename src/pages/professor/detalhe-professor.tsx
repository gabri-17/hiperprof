import Fetch from "@components/data-display/Fetch";
import PageTitle from "@components/data-display/PageTitle";
import ListaProfessorCard from "@components/data-display/ProfessorCard/listaProfessorCard";
import useDetalheProfessor from "@data/Hooks/pages/useDetalheProfessor";
import { TextFormatService } from "@data/services/TextFormatService";
import {
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  BoxCardProfessor,
  BoxDescription,
  BoxImage,
} from "@styles/pages/professor/detalhe-professor_styles";
import Dialog from "@components/Feedback/Dialog";
import InputMask from "react-input-mask";

export default function DetalheProfessorPage() {
  const {
    professor,
    professores,
    selecionarProfessor,
    openDialog,
    setOpenDialog,
    setAluno,
    handleSubmit,
    snackMessage,
    setSnackMessage,
    alunoError,
    setAlunoError,
  } = useDetalheProfessor();
  // Obtém a data atual
  const dataAtual = new Date();
  const dia = dataAtual.getDate().toString().padStart(2, "0");
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, "0"); // Os meses são indexados a partir de 0
  const ano = dataAtual.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;

  return (
    <Container>
      <PageTitle
        title="Detalhes do Professor"
        subtitle="Veja os detalhes do professor(a) e escolha aquele(a) que você achar ideal para ter uma aula."
      />
      <BoxCardProfessor>
        <BoxImage foto={professor?.foto_perfil} />
        <BoxDescription>
          <div className="box_esquerda">
            <Typography variant="h6">{professor?.nome}</Typography>
            <Typography
              sx={{ my: 2 }}
              className="descricao"
              paragraph
              variant="body2"
            >
              {professor?.descricao}
            </Typography>
          </div>
          <div className="box_direita">
            <Typography variant="body1" sx={{ my: 2 }}>
              Preço da hora/aula:
              {TextFormatService.currency(professor?.valor_hora)}
            </Typography>
            <Typography variant="h6" paragraph>
              Data: {dataFormatada}{" "}
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setOpenDialog(true)}
            >
              Contratar
            </Button>
          </div>
        </BoxDescription>
      </BoxCardProfessor>
      <Typography variant="body2" color={"grey"} sx={{ my: 10 }}>
        {professor?.descricao}
      </Typography>
      <Fetch
        data={professores?.filter(({ id }) => id !== professor?.id)}
        maxLength={3}
        render={(professoresFiltrado) => {
          return (
            <>
              <PageTitle
                title="Outros professores sugeridos"
                color={"primary.light"}
              />

              <ListaProfessorCard
                professores={professoresFiltrado}
                onClick={selecionarProfessor}
              />
            </>
          );
        }}
      />
      <Dialog
        isOpen={openDialog as boolean}
        title="Preencha suas informações"
        onConfirm={handleSubmit}
        onClose={() => {
          setOpenDialog(false);
          setAlunoError(undefined);
        }}
      >
        <TextField
          label={"Seu nome"}
          error={alunoError?.nome != undefined}
          helperText={alunoError?.nome}
          onChange={({ target: { value } }) =>
            setAluno((prevState) => {
              /* Passar todos os valores anteriores e sobrescrever o nome com que for passado no 
              onChange.*/
              return { ...prevState, nome: value };
            })
          }
          fullWidth
        />
        <TextField
          label={"Seu email"}
          type="email"
          sx={{ my: 3 }}
          error={alunoError?.email != undefined}
          helperText={alunoError?.email}
          fullWidth
          onChange={({ target: { value } }) =>
            setAluno((prevState) => {
              /* Passar todos os valores anteriores e sobrescrever o nome com que for passado no 
          onChange.*/
              return { ...prevState, email: value };
            })
          }
        />
        <InputMask 
        mask={"99/99/9999 99:99"}
        onChange={({ target: { value } }: any) => 
          setAluno((prevState) => {
            return { ...prevState, data_aula: value };
          })
        }
          >
          {() => {
            // Retornar o elemento que vai servir como base.
            /* Basicamente, vai pegar todas as estilizações dos elementos passados aqui dentro e
            vai atribuir a ele.*/
            return (
              <TextField
                label={"Horário da aula"}
                fullWidth
                error={alunoError?.data_aula != undefined}
                helperText={alunoError?.data_aula as string}
                
              />
            );
          }}
        </InputMask>
        {/* Passar todos os valores anteriores e sobrescrever o nome com que for passado no 
            onChange.*/}
      </Dialog>
      <Snackbar
        open={snackMessage.length > 0} // aberto quando estiver mensagem
        message={snackMessage} // mensagem
        autoHideDuration={4000}
        onClose={() => {
          setSnackMessage("");
        }} // fechar quando clicar no botão
      />
    </Container>
  );
}
