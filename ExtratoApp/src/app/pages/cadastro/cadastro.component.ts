import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lancamento } from 'src/app/models/Lancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  btnAcao = "Cadastrar Lançamento!"
  btnTitulo = "Cadastrar Lançamento"

  constructor(private lancamentoService : LancamentoService, private router: Router){

  }

  createFuncionario(lancamento: Lancamento){
    this.lancamentoService.CreateLancamento(lancamento).subscribe((data) => {
      this.router.navigate(['/'])
    })
  }

}
