import { IImovel } from 'app/shared/model/imovel.model';
import { StatusDebito } from 'app/shared/model/enumerations/status-debito.model';

export interface IDebito {
  id?: number;
  anoReferencia?: number;
  valor?: number;
  status?: StatusDebito;
  imovel?: IImovel;
}

export const defaultValue: Readonly<IDebito> = {};
