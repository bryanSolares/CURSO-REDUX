import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationsService } from 'src/app/services/animations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilde: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private animationServices: AnimationsService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilde.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ingresar() {
    if (this.loginForm.invalid) {
      return;
    }

    this.animationServices.createLoading();

    this.authService
      .ingresarUsuario(this.loginForm.value)
      .then((response) => {
        console.log(response);
        this.router.navigateByUrl('/');
        this.animationServices.closeAnimation();
      })
      .catch((error) => {
        console.error(error);
        this.animationServices.createMessageError(error.message);
      });
  }
}
