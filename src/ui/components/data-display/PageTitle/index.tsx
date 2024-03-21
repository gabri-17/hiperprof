import { PageSubtitleStyled, PageTitleContainer, PageTitleStyled } from "./styles";

export interface PageTitleProps{
    title: string;
    subtitle?:string // ? : dizer que é um campo opcional.
}

// ReactFC: function components e vai receberPageTitleProps como propriedades que podem ser pegas.
const PageTitle:React.FC<PageTitleProps> = ({title, subtitle}) =>{
    return (
        <PageTitleContainer>
            <PageTitleStyled color={'primary'}>{title}</PageTitleStyled>
            <PageSubtitleStyled>{subtitle}</PageSubtitleStyled>
        </PageTitleContainer>
    );
}

export default PageTitle;