import { IEndereco } from 'app/shared/model/endereco.model';
import { IUser } from 'app/shared/model/user.model';

export interface IPessoa {
  id?: number;
  cpf?: string;
  nomeCompleto?: string;
  endereco?: IEndereco;
  user?: IUser;
}

export const defaultValue: Readonly<IPessoa> = {};
