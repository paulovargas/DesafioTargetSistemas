import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lancamento } from 'src/app/models/Lancamento';

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Lancamento>();
  @Input() btnAcao!: string;
  @Input() btnTitulo!: string;
  @Input() dadosLancamento: Lancamento | null = null;

  lancamentoForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {
    this.lancamentoForm = new FormGroup({
      id: new FormControl(this.dadosLancamento ? this.dadosLancamento.id : 0),
      descricao: new FormControl(this.dadosLancamento ? this.dadosLancamento.descricao : '', [Validators.required]),
      dia: new FormControl(new Date()),
      valor: new FormControl(this.dadosLancamento ? this.dadosLancamento.valor : '', [Validators.required]),
      avulso: new FormControl(this.dadosLancamento ? this.dadosLancamento.avulso : 'Avulso', [Validators.required]),
      status: new FormControl(this.dadosLancamento ? this.dadosLancamento.status : 'Valido', [Validators.required]),
    });
  }
  submit(){
    this.onSubmit.emit(this.lancamentoForm.value);
  }
}
