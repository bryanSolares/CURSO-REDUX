import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { AnimationsService } from '../../services/animations.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  cargando = false;
  uiSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private animationsService: AnimationsService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  crearUsuario(): void {
    if (this.registroForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());
    const usuario = this.registroForm.value;
    this.authService
      .crearUsuario(usuario)
      .then((response) => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        this.animationsService.closeAnimation();
        this.animationsService.createMessageError(error.message);
      });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
