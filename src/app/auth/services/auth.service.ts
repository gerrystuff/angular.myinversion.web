import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  login(user_name: string, user_password: string) {

    const url = `${this.baseUrl}/auth/login`;
    const body = { user_name, user_password };

    return this.http.post<AuthResponse>(url, body)
      /**
       * El objetivo de hacer esta cadena de operadores
       * es asegurar que antes que llegue a la pantalla de login
       * aqui se tenga establecida la informacion antes de hacer la 
       * redireccion.
       */
      .pipe(
        //operadores de rxjs //van en cascada
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._user = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  validarToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`
  
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          this._user = {
            name: resp.name!,
            uid: resp.uid!
          }
          return resp.ok
        }),
        catchError(err => of(false))
      )
  }

  create(user_name:string,user_password:string) {
    const url = `${this.baseUrl}/api/users`

    const user = {
      user_name:user_name,
      user_password:user_password
    }

    console.log(url);


    return this.http.post<AuthResponse>(url,user)
            .pipe(
                map(resp => {
                  console.log(resp);
                  return resp.ok;
                }
                  ),
                  catchError(err => of(err.error.msg)))
    
  }

  logout(){
localStorage.clear();
  }
}
