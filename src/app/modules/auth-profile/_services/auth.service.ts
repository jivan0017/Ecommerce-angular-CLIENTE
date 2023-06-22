import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { User } from '../models/business/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: string | undefined | null;
  token: string | undefined;;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // NOTE: TIENE QUE CARGARSE EL USUARIO AUTENTICADO Y TOKEN
    this.loadLocalStorage();
  }

  loadLocalStorage() {
    console.log(">>> loadLocalStorage", localStorage.getItem("token"))
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token")?.toString();
      this.user = JSON.parse(localStorage.getItem("user") ?? '');
    } else {
      this.token = ''
      this.user = null;
    }
  }

  login(email: string, password: string) {
    let urlBase = URL_SERVICIOS + '/users/login';

    return this.http.post(urlBase, {email,password})
      .pipe(
        map((resp: any) => {
            if (resp.access_token) {
              // save info.
              return this.saveLocalStorageResponse(resp);
            } else {
              return resp;
            }
        }),
        catchError((err: any) => {
          return of(err);
        })
      );
  }

  register(data: User) {
    let urlBase = URL_SERVICIOS + '/users/register';
    console.log(data);
    return this.http.post(urlBase, data);
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(["auth/login"]);
  }

  saveLocalStorageResponse(resp: any) {

    if (resp.access_token && resp.user) {
      localStorage.setItem("token", resp.access_token);
      // convierte de JSON => string
      localStorage.setItem("user", JSON.stringify(resp.user));
      this.user = resp.user;
      this.token = resp.access_token;

      return true;
    }

    return false;
  }
}
