import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  constructor() {}

  createLoading() {
    Swal.fire({
      title: 'Wait Please!',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  createMessageError(mensaje: string) {
    Swal.fire('Login Error', mensaje, 'error');
  }

  closeAnimation() {
    Swal.close();
  }
}
