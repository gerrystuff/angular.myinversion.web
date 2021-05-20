import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  logForm:FormGroup = this.formBuilder.group({
    user_name: ['',[Validators.required,Validators.pattern('^[a-zA-Z]*')]]
  })
  constructor(private formBuilder:FormBuilder) { }

  register(){
    console.log(this.logForm.value)
    console.log(this.logForm.valid)
  }

}
