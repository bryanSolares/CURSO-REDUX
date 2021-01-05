import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../models/user.model';
import { loadUsers } from '../../store/actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('users').subscribe(({ users, loading, error }) => {
      this.users = users;
      this.loading = loading;
      this.error = error;
    });
    this.store.dispatch(loadUsers());
  }
}
