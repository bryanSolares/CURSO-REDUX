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
    delete transaccion.uid;
    return this.firestore
      .doc(`${uid}/ingreso-egreso`)
      .collection('items')
      .add({ ...transaccion });
  }

  initIngresosEgresosListener(uid: string) {
    return this.firestore
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map((snashot) =>
          snashot.map((doc) => {
            let data = doc.payload.doc.data() as IngresoEgreso;
            data.uid = doc.payload.doc.id;
            return { ...data };
          })
        )
      );
  }

  borrarIngresoEgreso(uidItem: string) {
    const uid = this.authService.user.uid;
    return this.firestore
      .doc(`${uid}/ingreso-egreso/items/${uidItem}`)
      .delete();
  }
}
