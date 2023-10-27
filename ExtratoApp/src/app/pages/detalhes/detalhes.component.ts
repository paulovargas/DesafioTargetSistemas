import { LancamentoService } from 'src/app/services/lancamento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento } from 'src/app/models/Lancamento';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  lancamento?: Lancamento;
  id!:number;

  constructor(private lancamentoService: LancamentoService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.lancamentoService.GetLancamento(this.id).subscribe((data) => {

      const dados = data.dados;
      dados.valor = new Number(dados.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
      dados.dia = dados.dia;
      this.lancamento = data.dados;
    })
  }
  CancelarLancamento(){
    this.lancamentoService.CancelarLancamento(this.id).subscribe((data) => {
      this.router.navigate(['/']);
    })
  }

}
