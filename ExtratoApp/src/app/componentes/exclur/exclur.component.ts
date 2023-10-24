import { Router } from '@angular/router';
import { FuncionarioService } from './../../services/funcionario.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Funcionario } from 'src/app/models/Funcionario';

@Component({
  selector: 'app-exclur',
  templateUrl: './exclur.component.html',
  styleUrls: ['./exclur.component.css']
})
export class ExclurComponent implements OnInit {

  inputdata: any;
  funcionario!: Funcionario

  constructor(
    private FuncionarioService: FuncionarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref:MatDialogRef<ExclurComponent>

  ){}

  ngOnInit(): void {
    this.inputdata = this.data;
    this.FuncionarioService.GetFuncionario(this.inputdata.id).subscribe((data) => {
      this.funcionario = data.dados;
    });
  }

  Excluir(){
    this.FuncionarioService.ExcluirFuncionario(this.inputdata.id).subscribe((data) => {
      this.ref.close();
      window.location.reload();
    })
  }

  Cancelar(){
    this.ref.close();
  }

}
