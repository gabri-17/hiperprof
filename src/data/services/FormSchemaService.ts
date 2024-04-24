import {
  ProfessorCadastroInterface,
  ProfessorErroInterface,
} from "@data/@types/professor";

export const FormSchemaService = {
  // Dados do cadastro, primeiramente, para validá-lo.
  cadastroProfessor(
    professor: ProfessorCadastroInterface
  ): ProfessorErroInterface {
    const formValidate = {} as ProfessorErroInterface;

    // if (!professor.nome) {
    //   formValidate.nome = "O campo idade é obrigatório!";
    //   BrowserService.scrolToTop();
    // } else if (!professor.descricao) {
    //   formValidate.descricao = "Descrição inválida!";
    //   BrowserService.scrolToTop();
    // } else if (!professor.email?.includes("@")) {
    //   formValidate.email = "O campo email é obrigatório!";
    //   BrowserService.scrolToTop();
    //   if (professor.email && !professor.email?.includes("@")) {
    //     formValidate.email = "Email inválido!";
    //     BrowserService.scrolToTop();
    //   }
    // } else if (!professor.idade) {
    //   formValidate.idade = "O campo idade é obrigatório!";
    // } else if (!professor.valor_hora) {
    //   formValidate.valor_hora = "O campo valor da hora é obrigatório!";
    // }

    if (professor.password && professor.password_confirmation) {
      if (professor.password != professor.password_confirmation) {
        formValidate.password = "As senhas são diferentes";
        formValidate.password_confirmation = "As senhas são diferentes";
      }
    }

    return formValidate;
  },
};
