export interface IEndereco {
  id?: number;
  cep?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  numero?: number;
  complemento?: string;
}

export const defaultValue: Readonly<IEndereco> = {};
