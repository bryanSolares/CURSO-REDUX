import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get(`${this.url}/users?page=1&delay=3`)
      .pipe(map<any, User[]>((response) => response['data']));
  }

  getUserById(id: string) {
    return this.http
      .get(`${this.url}/users/${id}`)
      .pipe(map<any, User>((response) => response['data']));
  }
}
