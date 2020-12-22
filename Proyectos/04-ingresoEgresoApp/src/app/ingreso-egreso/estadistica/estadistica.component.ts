import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';

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

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({ items }) => {
      this.generarEstadisticas(items);
    });
  }

  generarEstadisticas(items: IngresoEgreso[]) {
    console.log(items, '------------');
    items.forEach((element) => {
      if (element.tipo === 'ingreso') {
        this.totalIngresos += element.monto;
        this.ingresos++;
      } else if (element.tipo === 'egreso') {
        this.totalEgresos += element.monto;
        this.egresos++;
      }
    });
    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }
}
