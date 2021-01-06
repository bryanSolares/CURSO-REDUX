import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { loadUser } from '../../store/actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit {
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('user')
      .subscribe(({ user, loading, error }) => (this.user = user));

    this.activatedRoute.params.subscribe(({ id }) => {
      this.store.dispatch(loadUser({ id }));
    });
  }
}
