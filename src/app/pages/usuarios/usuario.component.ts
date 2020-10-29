import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  public formSubmited = false;

  public userForm = this.fb.group({
    nombre: ['', Validators.required ],
    rol: ['', Validators.required ],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validators: this.passIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private location: Location) { }

  ngOnInit(): void {
  }

  passIguales(pass1name: string, pass2name: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1name);
      const pass2Control = formGroup.get(pass2name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true});
      }
    };
  }

  campoNoValido( campo: string): boolean {

    if (this.userForm.get(campo).invalid && this.formSubmited) {
      return true;
    } else{
      return false;
    }

 }

 contrasenasNoValidas() {

     const pass1 = this.userForm.get('password').value;
     const pass2 = this.userForm.get('password2').value;

     if ((pass1 !== pass2) && this.formSubmited) {
       return true;
     } else {
       return false;
     }
 }

 pass1Novalido(): boolean {

    return this.userForm.get('password').invalid && this.formSubmited;

 }

  crearUsuario() {

    this.formSubmited = true;

    if (this.userForm.invalid) {
      return;
     }

    const { nombre } = this.userForm.value;

    this.usuarioService.crearUsuario( this.userForm.value)
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        }, (err) => {
          // si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  regresar() {
    this.location.back();
  }
}
