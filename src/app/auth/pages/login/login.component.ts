import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  logForm: FormGroup = this.formBuilder.group({
    user_name: ['',[Validators.required,Validators.pattern('^[a-zA-Z]*')]],
    user_password: ['',[Validators.required,Validators.minLength(6)]]
     
  })

  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService
    ) { }

  login(){
    const {user_name,user_password} = this.logForm.value;
    
    this.authService.login(user_name,user_password)
      .subscribe( ok => {
        if(ok === true){
          this.router.navigateByUrl('/home');  
        } else {
          Swal.fire('Error',ok,'error')
        }
      })
  }
}
