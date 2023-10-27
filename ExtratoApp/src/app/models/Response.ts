export interface Response<T>{
  data: Response<import("./Lancamento").Lancamento[]>;
  dados : T;
  mensagem: string;
  sucesso: boolean;
}
