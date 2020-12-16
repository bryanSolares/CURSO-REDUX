export class Usuario {
  constructor(
    public uid: string,
    public nombre: string,
    public correo: string
  ) {}

  static fromFirebase({ correo, nombre, uid }) {
    return new Usuario(uid, nombre, correo);
  }
}
