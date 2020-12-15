import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationsService } from '../../services/animations.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private animationsService: AnimationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  crearUsuario(): void {
    if (this.registroForm.invalid) {
      return;
    }

    this.animationsService.createLoading();
    const usuario = this.registroForm.value;
    this.authService
      .crearUsuario(usuario)
      .then((response) => {
        console.log(response);
        this.router.navigateByUrl('/');
        this.animationsService.closeAnimation();
      })
      .catch((error) => {
        console.error(error);
        this.animationsService.createMessageError(error.message);
      });
  }
}
