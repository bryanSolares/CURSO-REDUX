export interface Action {
  type: string;
  payload?: any;
}

export interface Reduce<T> {
  (state: T, action: Action): T;
}
