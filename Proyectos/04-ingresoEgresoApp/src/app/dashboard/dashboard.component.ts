import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  ingresosEgresosSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ieService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(
        filter((data: any) => data.userData !== null),
        map((user) => user.userData)
      )
      .subscribe(({ uid }) => {
        this.ingresosEgresosSubs = this.ieService
          .initIngresosEgresosListener(uid)
          .subscribe((ieFirebase) => {
            console.log(ieFirebase);
            this.store.dispatch(
              ingresoEgresoActions.setItems({ items: ieFirebase })
            );
          });
      });
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }
}
