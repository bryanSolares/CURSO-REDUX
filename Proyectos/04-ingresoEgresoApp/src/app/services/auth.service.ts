import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authFire: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  iniciarAuthListener() {
    this.authFire.authState.subscribe((firebaseUser) => {
      console.log(firebaseUser);
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

  salirSesion() {
    return this.authFire.signOut();
  }
}
