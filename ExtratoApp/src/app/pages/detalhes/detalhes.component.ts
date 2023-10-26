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

      dados.dataLanc = dados.dataLanc;//new Date(dados.dataLanc).toLocaleDateString('pt-BR');
      console.log("Data: ", dados.dataLanc);
      this.lancamento = data.dados;
    })
  }
  CancelarLancamento(){
    this.lancamentoService.CancelarLancamento(this.id).subscribe((data) => {
      this.router.navigate(['/']);
    })
  }

}
