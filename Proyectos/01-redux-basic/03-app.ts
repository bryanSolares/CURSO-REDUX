import { Reduce, Action } from "./ngrx-fake/ngrx";
import { contadorReducer } from "./contador/contador.recuder";
import { incrementadorAction, multiplicadorAction } from "./contador/contador.actions";
class Store<T> {
  constructor(private reducer: Reduce<T>, private state: T) {}

  getState() {
    return this.state;
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
  }
}

const store = new Store(contadorReducer, 10);
console.log(store.getState());
store.dispatch(incrementadorAction);
console.log(store.getState());
store.dispatch(multiplicadorAction);
console.log(store.getState());
