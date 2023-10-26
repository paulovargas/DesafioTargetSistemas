import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento } from 'src/app/models/Lancamento';
import { LancamentoService } from 'src/app/services/lancamento.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  btnAcao: string = 'Editar!'
  btnTitulo: string = 'Editar Lançamento'
  lancamento!: Lancamento;

  constructor(private lancamentoService: LancamentoService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.lancamentoService.GetLancamento(id).subscribe((data)=> {
      this.lancamento = data.dados;
    })
  }

  editarFuncionario(lancamento: Lancamento){
    this.lancamentoService.EditarLancamento(lancamento).subscribe((data)=>{
      this.router.navigate(['/'])
    })
  }

}
