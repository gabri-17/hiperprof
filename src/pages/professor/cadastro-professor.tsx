import PageTitle from "@components/data-display/PageTitle";
import CurrencyInputMask from "@components/inputs/CurrencyInputMask";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { BoxButtons } from "@styles/pages/professor/cadastro-professor-style";
import useCadastroProfessor from "./useCadastroProfessor";

export default function CadastroProfessorPage() {
  const {
    valuesCadastro,
    valuesErroCadastro,
    snackMessage,
    setSnackMessage,
    setValuesCadastros,
    handleSubmit,
    loading,
  } = useCadastroProfessor();
  return (
    <>
      <PageTitle title="Cadastrar dados" />
      <Box sx={{ maxWidth: "md", mx: "auto", my: 3 }}>
        <Card sx={{ p: 3 }}>
          <TextField
            label={"Nome"}
            error={valuesErroCadastro?.nome != undefined}
            helperText={valuesErroCadastro?.nome}
            sx={{ my: 2 }}
            /**
             *  onChange={({target: {value} }) =>{
              setValuesCadastros((prevState) => ({...prevState, nome: value}));
              })
             */
            onChange={(event) => {
              const value = (event.target as HTMLInputElement).value;
              setValuesCadastros((prevState) => ({
                ...prevState,
                nome: value,
              }));
            }}
            fullWidth // pegar o máximo de largura.
          />
          <TextField
            label={"Idade"}
            type="number"
            error={valuesErroCadastro?.idade != undefined}
            helperText={valuesErroCadastro?.nome}
            sx={{ my: 2 }}
            onChange={(event) => {
              const value = (event.target as HTMLInputElement).value;
              setValuesCadastros((prevState) => ({
                ...prevState,
                idade: +value, // conversão para um número.
              }));
            }}
            fullWidth // pegar o máximo de largura.
          />
          <CurrencyInputMask
            label={"Valor da hora/aula"}
            error={valuesErroCadastro?.valor_hora != undefined}
            helperText={valuesErroCadastro?.valor_hora}
            sx={{ my: 2 }}
            onChange={(event) => {
              const value = (event.target as HTMLInputElement).value;
              setValuesCadastros((prevState) => ({
                ...prevState,
                valor_hora: value,
              }));
            }}
            fullWidth // pegar o máximo de largura.
          />
          <TextField
            label={"Descrição"}
            rows={4}
            error={valuesErroCadastro?.descricao != undefined}
            helperText={valuesErroCadastro?.descricao}
            sx={{ my: 2 }}
            onChange={(event) => {
              const value = (event.target as HTMLInputElement).value;
              setValuesCadastros((prevState) => ({
                ...prevState,
                descricao: value,
              }));
            }}
            multiline
            fullWidth // pegar o máximo de largura.
          />
        </Card>

        <Card sx={{ p: 3, my: 5 }}>
          <TextField
            label={"Email"}
            type="email"
            error={valuesErroCadastro?.email != undefined}
            helperText={valuesErroCadastro?.email}
            onChange={({ target: { value } }) => {
              setValuesCadastros((prevState) => ({
                ...prevState,
                email: value,
              }));
            }}
            sx={{ my: 2 }}
            fullWidth // pegar o máximo de largura.
          />
          <TextField
            label={"Senha"}
            type="password"
            error={valuesErroCadastro?.password != undefined}
            helperText={valuesErroCadastro?.password}
            sx={{ my: 2 }}
            onChange={({ target: { value } }) => {
              setValuesCadastros((prevState) => ({
                ...prevState,
                password: value,
              }));
            }}
            fullWidth // pegar o máximo de largura.
          />
          <TextField
            label={"Confirmação de senha"}
            type={"password"}
            error={valuesErroCadastro?.password_confirmation != undefined}
            helperText={valuesErroCadastro?.password_confirmation}
            sx={{ my: 2 }}
            onChange={({ target: { value } }) => {
              setValuesCadastros((prevState) => ({
                ...prevState,
                password_confirmation: value,
              }));
            }}
            fullWidth // pegar o máximo de largura.
          />
        </Card>
        <BoxButtons>
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            {!loading ? "Cadastrar" : <CircularProgress color="primary" />}
          </Button>
        </BoxButtons>
      </Box>
      <Snackbar
        open={snackMessage.length > 0}
        message={snackMessage}
        autoHideDuration={4000}
        onClose={() => setSnackMessage("")}
      />
    </>
  );
}
