import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos = 0;
  egresos = 0;
  totalIngresos = 0;
  totalEgresos = 0;

  public doughnutChartLabels: Label[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppStateWithIngreso>) {}

  ngOnInit(): void {
    this.store
      .select('ingresosEgresos')
      .pipe(filter(({ items }) => items !== null))
      .subscribe(({ items }) => {
        this.generarEstadisticas(items);
      });
  }

  generarEstadisticas(items: IngresoEgreso[]) {
    this.totalEgresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.ingresos = 0;
    items.forEach((element) => {
      if (element.tipo === 'ingreso') {
        this.totalIngresos += element.monto;
        this.ingresos++;
      } else if (element.tipo === 'egreso') {
        this.totalEgresos += element.monto;
        this.egresos++;
      }
    });
    this.doughnutChartData = [[this.totalEgresos, this.totalIngresos]];
  }
}
