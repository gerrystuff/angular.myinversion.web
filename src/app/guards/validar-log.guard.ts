import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ValidarLogGuard implements CanLoad {

  constructor(private router:Router){}

  canLoad(): Observable<boolean> | boolean{ 
    
    if(localStorage.getItem('token') === null){
      return true;
    }else{
      this.router.navigateByUrl('home')
      return false;
    }
  }
}
