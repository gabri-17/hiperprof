import PageTitle from "@components/data-display/PageTitle";
import useIndex from "@data/Hooks/pages/useIndex";
import { Icon, TextField, Button } from "@mui/material";
import { BoxButtons, HomeContainer } from "@styles/pages/index.styles";

export default function Home() {
  const {messageErro,setSearch,onBuscarProfessor} = useIndex();
  return (
    <HomeContainer onSubmit={onBuscarProfessor}>
      <PageTitle
        title="ENCONTRE O PROFESSSOR IDEAL PARA VOCÊ !"
        subtitle="Pesquise pelo professor ideal para você"
      />
      <TextField sx={{ mt: 3, mb: 1 }} 
      label="Encontre um professor"
      error={messageErro.length > 0}
      helperText={messageErro}
      InputProps={{
        startAdornment: <Icon sx={{mr:1}}>personal_search</Icon>
      }}
      onChange={({target: {value}}) => setSearch(value)} // executado sempre quando se vai digitando.
      fullWidth
      required
      />

      <BoxButtons>
      {/* Uso do tipo submit para tag form.*/}
      <Button type="submit" variant="contained">Buscar o professor perfeito</Button>

      </BoxButtons>
    </HomeContainer>
  );
}
