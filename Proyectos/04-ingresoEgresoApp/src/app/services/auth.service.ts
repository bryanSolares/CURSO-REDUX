import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscripton: Subscription;
  private _user: Usuario;

  constructor(
    private authFire: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store
  ) {}

  iniciarAuthListener() {
    this.authFire.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        this.userSubscripton = this.firestore
          .doc(`${firebaseUser.uid}/usuario`)
          .valueChanges()
          .subscribe((userFirebase: any) => {
            const user = Usuario.fromFirebase(userFirebase);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        if (this.userSubscripton) {
          this._user = null;
          this.userSubscripton.unsubscribe();
        }
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  crearUsuario(usuario: { nombre: string; correo: string; password: string }) {
    const { nombre, correo, password } = usuario;
    return this.authFire
      .createUserWithEmailAndPassword(correo, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
      });
  }

  ingresarUsuario(usuario: { correo: string; password: string }) {
    const { correo, password } = usuario;
    return this.authFire.signInWithEmailAndPassword(correo, password);
  }

  estaLogueado() {
    return this.authFire.authState.pipe(
      map((firebaseUser) => firebaseUser != null)
    );
  }

  get user() {
    return { ...this._user };
  }

  salirSesion() {
    return this.authFire.signOut();
  }
}
