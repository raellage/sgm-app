import { IEndereco } from 'app/shared/model/endereco.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { ZonaImovel } from 'app/shared/model/enumerations/zona-imovel.model';
import { TipoImovel } from 'app/shared/model/enumerations/tipo-imovel.model';

export interface IImovel {
  id?: number;
  numeroCadastro?: number;
  largura?: number;
  comprimento?: number;
  area?: number;
  zona?: ZonaImovel;
  tipo?: TipoImovel;
  latitude?: string;
  longitude?: string;
  endereco?: IEndereco;
  pessoa?: IPessoa;
}

export const defaultValue: Readonly<IImovel> = {};
