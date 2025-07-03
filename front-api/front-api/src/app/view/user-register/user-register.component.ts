import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  registerForm: FormGroup;
  isSubmitted: boolean = false;
  hidePassword: boolean = true;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get formControls() {
    return this.registerForm.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      console.log('Invalido');
      return false;
    }
    this.login();
    return true;
  }

  login(): void {
    const user = new User();
    user.name = this.registerForm.get('name')?.value;
    user.email = this.registerForm.get('email')?.value;
    user.password = this.registerForm.get('password')?.value;
    this.userService.createSession(user).subscribe({
      next: (res) => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log('Registration Failed', err);
      },
    });
  }
}