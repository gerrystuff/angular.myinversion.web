import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent  {

  get user(){
    console.log(this.authService.user)
    return {... this.authService.user}
  }

  constructor(
    private router:Router,
    private authService:AuthService          
    ) { }


  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
