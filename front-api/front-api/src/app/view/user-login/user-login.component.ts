import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginForm : FormGroup;
  isSubmitted : boolean = false;
  hidePassword: boolean = true;
  
  constructor(
    private userService : UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router : Router){
      this.loginForm = this.formBuilder.group({
        email : ['', [Validators.required, Validators.email]],
        password : ['', Validators.required]
      })
    }

    get formControls(){
      return this.loginForm.controls;
    }

    submitForm(): boolean{
      this.isSubmitted = true;
      if(this.loginForm.invalid){
        console.log("inválido")
        return false;
      }
      this.login()
      return true;
    }

  login(): void{
    const user = new User();
    user.email = this.loginForm.get('email')?.value;
    user.password = this.loginForm.get('password')?.value;
    this.userService.createSession(user).subscribe({
      next: (res) => {
        console.log(res);
        this.authService.mockUserLogin(res);
        this.router.navigate(['home'])
      }, error: (err) => {
        console.log('Login failed', err);
      }
    })
  }

  goToRegister(): void{
    this.router.navigate(['register'])
  }
}
