import PageTitle from "@components/data-display/PageTitle"
import ProfessorCard from "@components/data-display/ProfessorCard"
import { Icon, TextField } from "@mui/material"

export default function PesquisaProfessorPage(){
    return (
        <>
            <TextField
            sx={{mt:4, mb:2}}
                label={"Encontre um professor"}
                InputProps={{
                    startAdornment: <Icon sx={{mr:1}}>search</Icon>
                }}
                fullWidth
                required
            />
            <PageTitle 
            title="Professores encontrados"
            subtitle="Clique sobre um professor para saber os detalhes e possivelmente marcar uma aula com ele."
            />
            <ProfessorCard/>
        </>
        
    ) 
} 