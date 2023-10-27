import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lancamento } from '../models/Lancamento';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private apiUrl = `${environment.ApiUrl}/Lancamento`

  constructor( private http: HttpClient ) { }

  GetLancamentos(date: string) : Observable<Response<Lancamento[]>>{
    return this.http.get<Response<Lancamento[]>>(`${this.apiUrl}/${date}`);
  }
  GetLancamento(id: number) : Observable<Response<Lancamento>>{
    return this.http.get<Response<Lancamento>>(`${this.apiUrl}/${id}`);
  }
  CreateLancamento(lancamento: Lancamento) : Observable<Response<Lancamento[]>>{
    return this.http.post<Response<Lancamento[]>>(`${this.apiUrl}`, lancamento);
  }
  EditarLancamento(lancamento: Lancamento) : Observable<Response<Lancamento[]>>{
    return this.http.put<Response<Lancamento[]>>(`${this.apiUrl}`, lancamento);
  }

  CancelarLancamento(id: number) : Observable<Response<Lancamento[]>>{
    return this.http.put<Response<Lancamento[]>>(`${this.apiUrl}/CancelarLancamento/${id}`, id);
  }

  ExcluirLancamento(id: number) : Observable<Response<Lancamento[]>>{
    return this.http.delete<Response<Lancamento[]>>(`${this.apiUrl}?id=${id}`);
  }
}
