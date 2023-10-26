import { Router } from '@angular/router';
import { LancamentoService } from '../../services/lancamento.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lancamento } from 'src/app/models/Lancamento';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit {

  inputdata: any;
  lancamento!: Lancamento

  constructor(
    private LancamentoService: LancamentoService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref:MatDialogRef<ExcluirComponent>

  ){}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.LancamentoService.GetLancamento(this.inputdata.id).subscribe((data) => {
      this.lancamento = data.dados;
    });
  }

  Excluir(){
    this.LancamentoService.ExcluirLancamento(this.inputdata.id).subscribe((data) => {
      this.ref.close();
      window.location.reload();
    })
  }

  Cancelar(){
    this.ref.close();
  }

}
