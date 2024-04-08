export interface AlunoInterface {
  nome: string;
  email: string;
  data_aula: string | Date;
  id?: number; // campo opcional.
}

export interface AlunoErrorResponseInterface extends AlunoInterface {}