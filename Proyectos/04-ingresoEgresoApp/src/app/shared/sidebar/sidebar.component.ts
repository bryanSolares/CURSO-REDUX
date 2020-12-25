import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  nombre = '';
  userSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter(({ userData }) => userData !== null))
      .subscribe(({ userData }) => (this.nombre = userData.nombre));
  }

  salirSesion() {
    this.authService.salirSesion().then(() => this.router.navigate(['/login']));
  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
