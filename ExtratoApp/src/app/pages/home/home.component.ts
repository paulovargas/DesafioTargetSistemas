import { MatDatepickerModule } from '@angular/material/datepicker';
import { Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/componentes/excluir/excluir.component';
import { Lancamento } from 'src/app/models/Lancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  lancamentos: Lancamento[] = [];
  lancamentosGeral: Lancamento[] = [];

  colunas = ['Status','Código','Descrição','Data','Valor', 'Ações','Excluir']

  constructor( private lancamentoService: LancamentoService, public dialog: MatDialog){ }

  ngOnInit(): void {

    this.lancamentoService.GetLancamentos().subscribe(data => {
      const dados = data.dados;
      dados.map((item) =>{
        item.dataLanc = item.dataLanc;//new Date(item.dataLanc!).toLocaleDateString('pt-BR')
      })
      console.log("Data :", dados)
      this.lancamentos = data.dados;
      this.lancamentosGeral = data.dados;
    })
  }
  search(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();

    this.lancamentos = this.lancamentosGeral.filter(lancamento => {
      return lancamento.descricao.toLocaleLowerCase().includes(value);
    })
  }

  OpenDialog(id: number){
      this.dialog.open(ExcluirComponent, {
        width: '450px',
        height: '450px',
        data: {
          id: id
        }
      });
    }
  }
