import {
  incrementadorAction,
  decrementadorAction,
  multiplicadorAction,
  dividirAction,
} from "./contador/contador.actions";
import { resetAction } from "./contador/contador.actions";
import { reducer } from "./contador/contador.recuder";

console.log(reducer(10, incrementadorAction)); // TODO output: 11
console.log(reducer(10, decrementadorAction)); // TODO output: 9
console.log(reducer(10, multiplicadorAction)); // TODO output: 20
console.log(reducer(10, dividirAction)); // TODO output: 5
console.log(reducer(10, resetAction)); // TODO output: 0
