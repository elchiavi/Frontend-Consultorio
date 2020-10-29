import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { PacientesService } from '../../services/pacientes.service';
import { ObrasSocialesService } from '../../services/obras-sociales.service';
import { ObraSocial } from '../../models/obra-social.model';
import Swal from 'sweetalert2';
import { element } from 'protractor';


@Component({
  selector: 'app-new-paciente',
  templateUrl: './new-paciente.component.html',
  styles: [
  ]
})
export class NewPacienteComponent implements OnInit {

  public formSubmited = false;
  public obrasSociales: ObraSocial[] = [];

  public pacienteForm = this.fb.group({
    apellido: ['', Validators.required ],
    nombre: ['', Validators.required ],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)] ],
    email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    obraSocial: ['', Validators.required ],
    numeroAfiliado: ['', Validators.required],
    fechaNac: ['', Validators.required ],
    sexo: ['', Validators.required ],
    telefono: ['', Validators.required ],
    direccion: ['', Validators.required ],
    ciudad: ['', Validators.required ],
  });

  constructor( private fb: FormBuilder,
               private pacienteService: PacientesService,
               private obraSocServices: ObrasSocialesService,
               private activatedRoute: ActivatedRoute,
               private location: Location) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe( ({id}) => this.cargarPacienteId( id ));

    this.cargarObrasSociales();
  }

  regresar() {
    this.location.back();
  }

  cargarPacienteId( id: string ) {

  }

  campoNoValido( campo: string): boolean {

    if (this.pacienteForm.get(campo).invalid && this.formSubmited) {
      return true;
    } else{
      return false;
    }

  }

  cargarObrasSociales() {

    this.obraSocServices.cargarObrasSociales()
        .subscribe(  resp => {
          this.obrasSociales = resp.obrasSociales;
        });

  }


  crearPaciente() {

    this.formSubmited = true;

    if (this.pacienteForm.invalid) {
      return;
    }
    this.pacienteForm.get('numeroAfiliado').enable();
    const { apellido, nombre } = this.pacienteForm.value;

    this.pacienteService.crearPaciente( this.pacienteForm.value)
    .subscribe( (resp: any) => {
      Swal.fire('Creado', `Paciente ${apellido}, ${nombre} creado correctamente`, 'success');
      this.formSubmited = false;
      this.pacienteForm.reset();
    }, (err) => {
      // si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    });

  }

  validarNroAfiliado() {

    const {obraSocial} = this.pacienteForm.value;

    const elemento = this.obrasSociales.findIndex( item => item._id === obraSocial);
    const nombreOS = this.obrasSociales[elemento].nombre;

    if ( nombreOS === 'Particular') {

      this.pacienteForm.get('numeroAfiliado').disable();
      this.pacienteForm.controls['numeroAfiliado'].setValue('-');

    } else {

      this.pacienteForm.get('numeroAfiliado').enable();

    }
  }


}
