import PageTitle from "@components/data-display/PageTitle";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { BoxButtons, ButtonRecAccount } from "@styles/login.styles";
import useLogin from "./useLogin";

export default function LoginPage() {
  const {
    messageErro,
    setValuesLogin,
    handleLogin,
    loading,
    snackMessage,
    setSnackMessage,
  } = useLogin();
  return (
    //Servir como base para se ter um tamanho máximo de largura.
    <Box
      sx={{
        maxWidth: "md",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <PageTitle
        title="consultar minhas aulas"
        subtitle="Faça login para poder consultar as aulas"
      ></PageTitle>
      <Card
        component={"form"} // Card (conteúdo pai) vai se comportar como formulário.
        onSubmit={() => handleLogin}
        sx={{
          py: 2,
          px: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* FullWidth: pegar o máximo de largura da tela.*/}
        <TextField
          label={"Email"}
          error={messageErro?.email != undefined}
          helperText={messageErro?.email}
          sx={{ my: 2 }}
          type={"email"}
          onChange={({ target: { value } }) => {
            // API espera um json, mesmo vazio.
            setValuesLogin((prevState) => {
              // Desestruturação passando o campo value.
             return { ...prevState, email: value }; // value: retorna uma string.
            });
          }}
          fullWidth
        />
        <TextField
          label={"Senha"}
          error={messageErro?.password != undefined}
          helperText={messageErro?.password}
          type={"password"}
          onChange={({ target: { value } }) => {
            setValuesLogin((prevState) => {
              // Desestruturação passando o campo value.
             return { ...prevState, password: value }; // value: retorna uma string.
            });
          }}
          fullWidth
        />
        {/* Componente limitador do tamanho relacionado ao botão.*/}
        <BoxButtons sx={{ alignItems: "center" }}>
          <Button sx={{ my: 3 }} variant={"contained"} fullWidth>
            {loading ? "Acessar" : <CircularProgress color="primary" />}
          </Button>
          <ButtonRecAccount size="small" fullWidth>
            Não possui conta? Cadastre-se agora
          </ButtonRecAccount>
        </BoxButtons>
      </Card>
      <Snackbar
        open={snackMessage.length > 0}
        message={snackMessage}
        autoHideDuration={4000}
        onClose={() => setSnackMessage("")}
      />
    </Box>
  );
}
