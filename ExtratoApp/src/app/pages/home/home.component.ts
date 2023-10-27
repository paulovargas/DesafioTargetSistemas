import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/componentes/excluir/excluir.component';
import { Lancamento } from 'src/app/models/Lancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';
import { FormControl, FormGroup } from '@angular/forms';
import { subDays } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  date = new FormControl<Date>(new Date());
  dayago = new FormControl(subDays(new Date(), 2));

  lancamentos: Lancamento[] = [];
  lancamentosGeral: Lancamento[] = [];

  saldo = 0 as number;

  colunas = ['Status', 'Tipo','Código','Descrição','Data','Valor', 'Ações','Excluir']

  myGroup: FormGroup;

  constructor( private lancamentoService: LancamentoService, public dialog: MatDialog){
    this.myGroup = new FormGroup({
      date: this.date,
      dayago: this.dayago,

      })
   }

  ngOnInit(): void {
    this.onDateRangeApply();
  }

  onLoadGrid(){

    this.saldo = 0;

    const inicio = this.dayago;
    const fim = this.date;

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

  onDateRangeApply() {
    this.dayago = this.myGroup.get('dayago')?.value.toJSON().substring(0, 10);
    this.date = this.myGroup.get('date')?.value.toJSON().substring(0, 10);
    this.onLoadGrid();
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
