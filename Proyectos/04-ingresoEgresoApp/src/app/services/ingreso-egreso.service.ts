import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(transaccion: IngresoEgreso) {
    const uid = this.authService.user.uid;
    console.log(transaccion);
    console.log(uid);
    return this.firestore
      .doc(`${uid}/ingreso-egreso`)
      .collection('items')
      .add({ ...transaccion });
  }

  initIngresosEgresosListener(uid: string) {
    this.firestore
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map((snashot) =>
          snashot.map((doc) => ({
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as any),
          }))
        )
      )
      .subscribe(console.log);
  }
}
