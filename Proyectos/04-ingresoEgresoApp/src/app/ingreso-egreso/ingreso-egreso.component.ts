import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo = 'ingreso';
  cargando = false;
  loadingSubs: Subscription;

  constructor(
    private formBuild: FormBuilder,
    private ieService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingresoForm = this.formBuild.group({
      descripcion: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(1)]],
    });

    this.loadingSubs = this.store
      .select('ui')
      .subscribe(({ isLoading }) => (this.cargando = isLoading));
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ieService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        Swal.fire('Registro Creado', descripcion, 'success');
        this.ingresoForm.reset();
        this.store.dispatch(ui.stopLoading());
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
        this.store.dispatch(ui.stopLoading());
      });
  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }
}
