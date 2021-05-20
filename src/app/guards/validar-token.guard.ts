import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService:AuthService,
              private router:Router){}

  canActivate():Observable<boolean> | boolean {
    console.log('can active')
     return this.authService.validarToken()
            .pipe(
              tap(ok=>{
                if(!ok){
                  this.router.navigateByUrl('/auth')
                }
              })
            )

  }

  canLoad():Observable<boolean> | boolean {
    console.log('can load')
    return this.authService.validarToken()
    .pipe(
      tap(ok=>{
        if(!ok){
          this.router.navigateByUrl('/auth')
        }
      })
    )
  }

}
