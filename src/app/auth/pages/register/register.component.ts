import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  regForm:FormGroup = this.formBuilder.group({
    user_name: ['',[Validators.required,Validators.pattern('^[a-zA-Z]*')]],
    user_password: ['',[Validators.required,Validators.minLength(6)]]
  })
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService
    ) { }

  register(){
  
    const {user_name,user_password} = this.regForm.value;

    this.authService.create(user_name,user_password)
        .subscribe(ok => {
          if(ok === true){
              Swal.fire('Success','Usuario creado, favor de logearse.','success');
              this.waitUnTill();
          }else{
            Swal.fire('Error',ok,'error')
          }
        })
        

  }


  waitUnTill() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.router.navigate(['/auth/login'])
      }, 1200);
    });
  }

}
