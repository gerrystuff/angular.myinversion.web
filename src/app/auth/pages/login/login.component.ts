import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  logForm: FormGroup = this.formBuilder.group({
    user_name: ['',[Validators.required,Validators.pattern('^[a-zA-Z]*')]],
    user_password: ['',[Validators.required,Validators.minLength(6)]]
     
  })

  constructor(private formBuilder:FormBuilder) { }

  login(){
    console.log(this.logForm.value)
    console.log(this.logForm.valid)
  }
}
