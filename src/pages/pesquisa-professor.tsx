import Fetch from "@components/data-display/Fetch";
import PageTitle from "@components/data-display/PageTitle";
import ListaProfessorCard from "@components/data-display/ProfessorCard/listaProfessorCard";
import usePesquisaProfessor from "@data/Hooks/pages/usePesquisaProfessor";
import { Container, Icon, TextField } from "@mui/material";

export default function PesquisaProfessorPage() {
  const { professores, onSearch, selecionarProfessor } = usePesquisaProfessor();
  return (
    // Container: vai definir um limite de tamanho da tela (faz parte do Material UI).
    <Container>
      <TextField
        sx={{ mt: 4, mb: 2 }}
        label={"Encontre um professor"}
        InputProps={{
          startAdornment: <Icon sx={{ mr: 1 }}>search</Icon>,
        }}
        onChange={({target: {value} }) => onSearch(value)}
        fullWidth
        required
      />
      <PageTitle
        title="Professores encontrados"
        subtitle="Clique sobre um professor para saber os detalhes e possivelmente marcar uma aula com ele."
      />

      <Fetch
        data={professores}
        mensage={"Nenhum professor encontrado"}
        render= {(professores) => {
          return (
            // {/* Botão para selecionar professor(a) */}
            <ListaProfessorCard
              professores={professores}
              onClick={selecionarProfessor}
            />
            );
        }}
        
      />

    </Container>
  );
}
