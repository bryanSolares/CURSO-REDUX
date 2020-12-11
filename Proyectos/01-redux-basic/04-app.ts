import { createStore, Store } from "redux";
import { contadorReducer } from "./contador/contador.recuder";
import {
  incrementadorAction,
  decrementadorAction,
  multiplicadorAction,
  dividirAction,
} from "./contador/contador.actions";

const store: Store = createStore(contadorReducer);
store.subscribe(() => {
  console.log("subs: ", store.getState());
});
store.dispatch(incrementadorAction);
store.dispatch(decrementadorAction);
store.dispatch(multiplicadorAction);
store.dispatch(dividirAction);
