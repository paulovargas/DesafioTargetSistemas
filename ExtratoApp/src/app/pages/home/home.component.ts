import { MatDatepickerModule } from '@angular/material/datepicker';
import { Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/componentes/excluir/excluir.component';
import { Lancamento } from 'src/app/models/Lancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  date = new FormControl<Date>(new Date());
  ontem = new Date(new Date().setHours(-1)).setHours(-1);
  dayago = new FormControl<Date>(new Date(this.ontem));

  lancamentos: Lancamento[] = [];
  lancamentosGeral: Lancamento[] = [];

  saldo = 0 as number;

  colunas = ['Status', 'Tipo','Código','Descrição','Data','Valor', 'Ações','Excluir']

  constructor( private lancamentoService: LancamentoService, public dialog: MatDialog){ }

  ngOnInit(): void {

    console.log("Dia anterior: ", this.dayago.value?.toJSON().substring(0, 10));
    console.log("Hoje: ", this.date.value?.toJSON().substring(0, 10));

    const inicio = this.dayago.value?.toJSON().substring(0, 10);
    const fim = this.date.value?.toJSON().substring(0, 10);

    this.lancamentoService.GetLancamentos(`RangeData?inicio=${inicio}&fim=${fim}`).subscribe(data => {
      const dados = data.dados;
      dados.map((item) =>{
        if (item.status != 'Cancelado') {
          var stringNumber = item.valor;
        var saldo = +stringNumber;
        this.saldo = this.saldo + saldo;
        }
        item.valor = new Number(item.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      })
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
