import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ieSubscription: Subscription;
  ingresosEgresos: IngresoEgreso[] = [];

  constructor(
    private store: Store<AppState>,
    private ieService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ieSubscription = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.ingresosEgresos = items;
      });
  }

  borrar(uid: string) {
    this.ieService
      .borrarIngresoEgreso(uid)
      .then(() => Swal.fire('Borrado', 'Item Eliminado', 'success'))
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }

  ngOnDestroy(): void {
    this.ieSubscription.unsubscribe();
  }
}
