export interface Response<T>{
  data: Response<import("/home/paulo/projetos/FULLSTACK/DESAFIOTARGETSISTEMAS/ExtratoApp/src/app/models/Lancamento").Lancamento[]>;
  dados : T;
  mensagem: string;
  sucesso: boolean;
}
