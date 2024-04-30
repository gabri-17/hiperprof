import { ProfessorInterface } from "@data/@types/professor";
import { Button, Grid, Icon, Skeleton } from "@mui/material";
import { UserAvatar } from "./style";

interface UserProfileAvatarProps {
  onClick?: () => void; // ? : não é obrigatório.
  professor?: ProfessorInterface;
}

export default function UserProfileAvatar({
  onClick,
  professor,
}: UserProfileAvatarProps) {
  /* Verificar sem tem professor e se o professor em si não está undefined.*/
  const hasUser = professor !== undefined && professor.nome.length > 0;
  return (
    //inherit: herdar a cor.
    <Button color="inherit" onClick={onClick}>
        {/* container tem 12 colunas*/}
      <Grid container spacing={1} wrap="nowrap">
        {/* Cada um dos itens ocupa inicialmente doze colunas. */}
        <Grid item>
          {/* Verificação se tem professor */}
          {hasUser ? (
            <UserAvatar alt={professor?.nome} src={professor?.foto_perfil}>
              {professor?.nome[0]}
            </UserAvatar>
          ) : (
            <Skeleton
              width={40}
              height={40}
              variant="circular"
              animation="wave"
            />
          )}
        </Grid>
        <Grid item container spacing={1} alignItems={"center"}>
          {hasUser ? (
            <Grid item>{professor?.nome}</Grid>
          ) : (
            <Skeleton width={100} variant="text" animation="wave" />
          )}
          <Grid item>
            <Icon>arrow_drop_down</Icon>
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
}
