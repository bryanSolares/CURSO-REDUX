import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { resetear } from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: [],
})
export class NietoComponent implements OnInit {
  // @Input() contador: number;
  // @Output() contadorCambio = new EventEmitter<number>();
  contador: number;

  constructor(private store: Store<AppState>) {
    this.store.select('contador').subscribe((valor) => (this.contador = valor));
  }

  ngOnInit(): void {}
  reset() {
    // this.contador = 0;
    // this.contadorCambio.emit(0);
    this.store.dispatch(resetear());
  }
}
