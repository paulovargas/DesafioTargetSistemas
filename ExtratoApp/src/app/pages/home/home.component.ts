import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExclurComponent } from 'src/app/componentes/exclur/exclur.component';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];

  colunas = ['Situacao','Nome','Sobrenome','Departamento','Turno', 'Ações','Excluir']

  constructor( private funcionarioService: FuncionarioService, public dialog: MatDialog){}

  ngOnInit(): void {

    this.funcionarioService.GetFuncionarios().subscribe(data => {
      const dados = data.dados;
      dados.map((item) =>{
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString('pt-BR')
        item.dataDeAlteracao = new Date(item.dataDeAlteracao!).toLocaleDateString('pt-BR')
      })
      this.funcionarios = data.dados;
      this.funcionariosGeral = data.dados;
    })
  }
  search(event: Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();

    this.funcionarios = this.funcionariosGeral.filter(funcionario => {
      return funcionario.nome.toLocaleLowerCase().includes(value);
    })
  }

  OpenDialog(id: number){
      this.dialog.open(ExclurComponent, {
        width: '450px',
        height: '450px',
        data: {
          id: id
        }
      });
    }
  }
