export interface AlunoInterface {
  nome: string;
  email: string;
  data_aula: string | Date;
  id: number;
  // ?: campo opcional (pode ser nulo).
}

export interface AlunoErrorResponseInterface extends Omit<AlunoInterface, "id"> {}
