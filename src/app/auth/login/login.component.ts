import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email:    [localStorage.getItem('email') || '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
    });

    public formSubmited = false;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    this.formSubmited = true;

    if (this.loginForm.invalid) {
      return;
     }

    this.usuarioService.login(this.loginForm.value)
    .subscribe( resp => {
      if ( this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
      // Ir la dashboard
      this.router.navigateByUrl('/dashboard');

    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  campoNoValido( campo: string): boolean {

    if (this.loginForm.get(campo).invalid && this.formSubmited) {
      return true;
    } else{
      return false;
    }

 }

}
