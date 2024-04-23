export interface ProfessorInterface {
  id: number;
  nome: string;
  email: string;
  idade: number | string;
  descricao: string;
  valor_hora: number;
  foto_perfil?: string /**Campo opcional: pode ser nulo */;
  created_at: string; //Campo obrigatório
  updated_at: string; //Campo obrigatório
}

// Herdar todas as propriedades de ProfessorInterface, mas adicionar mais propriedades.
export interface ProfessorCadastroInterface
  extends Omit<
    ProfessorInterface,
    "id" | "created_at" | "updated_at" | "valor_hora"
  > {
  password_confirmation: string;
  password: string;
  valor_hora: string | number;
}
export interface ProfessorErroInterface
  extends Omit<ProfessorCadastroInterface, "idade" | "valor_hora"> {
  idade: string;
  valor_hora: string;
}
