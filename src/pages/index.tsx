import PageTitle from "@components/data-display/PageTitle";
import { Icon, TextField, Button } from "@mui/material";
import { BoxButtons, HomeContainer } from "@styles/pages/index.styles";

export default function Home() {
  return (
    <HomeContainer>
      <PageTitle
        title="ENCONTRE O PROFESSSOR IDEAL PARA VOCÊ !"
        subtitle="Pesquise pelo professor ideal para você"
      />
      <TextField sx={{ mt: 3, mb: 1 }} 
      label="Encontre um professor"
      InputProps={{
        startAdornment: <Icon>personal_search</Icon>
      }}
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
