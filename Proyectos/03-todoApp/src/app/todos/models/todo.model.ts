export class Todo {
  public id: number;
  public texto: string;
  public completado: boolean;

  constructor(texto: string) {
    this.texto = texto;
    this.id = Math.random() * 100;
    this.completado = false;
  }
}
