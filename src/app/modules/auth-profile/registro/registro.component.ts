import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  userForm!: FormGroup;

  validationType = {
    email:    [Validators.required, Validators.email],
    password: [Validators.required],
    repeat_password: [Validators.required],
  }

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit(): void {

    if (this.authService.user && this.authService.token) {
      this.router.navigate(["/"]);
    }

    this.createForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      name:            new FormControl('', Validators.required),
      surname:         new FormControl('', Validators.required),
      email:           new FormControl('', Validators.compose(this.validationType['email'])),
      login:           new FormControl('login', Validators.required),
      password:        new FormControl('', Validators.compose(this.validationType['password'])),
      repeat_password: new FormControl('', Validators.compose(this.validationType['repeat_password'])),
    });
  }

  onSubmit() {
    console.warn("warn :>> ", this.userForm?.value);

    if (this.userForm.valid) {

      this.authService.register(
        this.userForm.value
      ).subscribe((resp: any) => {
        console.log("res >>> ", resp);
        this.router.navigate(["auth/login"]);
      });

    } else {

      alert(
        "DEBE DILIGENCIAR LA TOTALIDAD DE CAMPOS DEL FORMULARIO DEL REGISTRO DE USUARIO"
      );
      return;
    }
  }
}
