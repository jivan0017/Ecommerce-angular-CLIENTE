import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userForm!: FormGroup;

  validationType = {
    email:    [Validators.required, Validators.email],
    password: [Validators.required],
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
  ) {
    // this.createForm();

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      email:    new FormControl('', Validators.compose(this.validationType['email'])),
      login:    new FormControl('', null),
      password: new FormControl('', Validators.compose(this.validationType['password'])),
    });
  }

  onSubmit() {
    console.warn(this.userForm?.value);

    if (this.userForm.valid) {
      this.authService.login(
        this.userForm.get('email')?.value,
        this.userForm.get('password')?.value).subscribe((resp: any) => {
        console.log("res: >>>", resp);

        if (!resp.error && resp) {
          //
          document.location.reload();
        }
      })
    } else {
      alert("EL USUARIO O LA CONTRASEÑA INGRESADOS SON CON CORRECTOS");
      return;
    }
  }
}
