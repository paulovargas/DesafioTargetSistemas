export interface Lancamento{
  id?: number;
  descricao: string;
  dataLanc: string;
  valor: number;
  avulso?: string;
  status?: string;
}
