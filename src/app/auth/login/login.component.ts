import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm = this.fb.group({
    email:    [localStorage.getItem('email') || '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
    });

    public formSubmited = false;
    public subscriptions = new Subscription();

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router) { }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }

  ngOnInit(): void {
  }

  login() {

    this.formSubmited = true;

    if (this.loginForm.invalid) {
      return;
     }

    this.subscriptions.add(this.usuarioService.login(this.loginForm.value)
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
    }));
  }

  campoNoValido( campo: string): boolean {

    if (this.loginForm.get(campo).invalid && this.formSubmited) {
      return true;
    } else{
      return false;
    }

 }

}
