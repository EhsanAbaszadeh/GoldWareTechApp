import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new UntypedFormGroup({
    username: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new UntypedFormControl('', Validators.required)
  });

  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
  }
}
