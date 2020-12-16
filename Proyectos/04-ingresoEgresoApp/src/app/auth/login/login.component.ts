import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { AuthService } from 'src/app/services/auth.service';
import { AnimationsService } from 'src/app/services/animations.service';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;

  constructor(
    private formBuilde: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private animationServices: AnimationsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilde.group({
      correo: ['1@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });

    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  ingresar() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    this.authService
      .ingresarUsuario(this.loginForm.value)
      .then((response) => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        this.store.dispatch(ui.stopLoading());
        this.animationServices.createMessageError(error.message);
      });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
