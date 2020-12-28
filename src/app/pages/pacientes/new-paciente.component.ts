import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { PacientesService } from '../../services/pacientes.service';
import { ObraSocial } from '../../models/obra-social.model';
import { BusquedasService } from '../../services/busquedas.service';
import { Paciente } from 'src/app/models/paciente.model';



@Component({
  selector: 'app-new-paciente',
  templateUrl: './new-paciente.component.html',
  styles: [
  ]
})
export class NewPacienteComponent implements OnInit, OnDestroy {

  public id = '';
  public cargando = false;
  public pacienteSeleccionado: Paciente;
  public formSubmited = false;
  public obrasSociales: ObraSocial[] = [];
  public subscriptions = new Subscription();

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
               private busquedasServices: BusquedasService,
               private route: ActivatedRoute,
               private router: Router,
               private location: Location) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== 'nuevo') {
      this.subscriptions.add(this.pacienteService.buscarPacientePorId(this.id).
        subscribe( (pac: Paciente) => {
            if (!pac) {
              return this.router.navigateByUrl('/dashboard/pacientes'); // si no existe(manipulan url) los saco
            }
            this.pacienteSeleccionado = pac;
            this.cargarcampos(this.pacienteSeleccionado);
            this.cargando = false;
        }));
    }

    this.cargarObrasSociales();
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }

  regresar() {
    this.location.back();
  }


  campoNoValido( campo: string): boolean {

    if (this.pacienteForm.get(campo).invalid && this.formSubmited) {
      return true;
    } else{
      return false;
    }

  }

  cargarcampos( paciente: Paciente ){

    this.pacienteForm.patchValue({['apellido']: paciente.apellido});
    this.pacienteForm.patchValue({['nombre']: paciente.nombre});
    this.pacienteForm.patchValue({['dni']: paciente.dni});
    this.pacienteForm.patchValue({['obraSocial']: paciente.obraSocial._id});
    this.pacienteForm.patchValue({['numeroAfiliado']: paciente.numeroAfiliado});
    this.pacienteForm.patchValue({['email']: paciente.email});
    this.pacienteForm.patchValue({['fechaNac']: paciente.fechaNac});
    this.pacienteForm.patchValue({['sexo']: paciente.sexo});
    this.pacienteForm.patchValue({['telefono']: paciente.telefono});
    this.pacienteForm.patchValue({['direccion']: paciente.direccion});
    this.pacienteForm.patchValue({['ciudad']: paciente.ciudad});

    if ( paciente.obraSocial.nombre === 'Particular') {

      this.pacienteForm.get('numeroAfiliado').disable();
    }

  }

  cargarObrasSociales() {

    this.subscriptions.add(this.busquedasServices.cargarObrasSocialesActivas()
        .subscribe(  resp => {
          this.obrasSociales = resp;
        }));

  }

  guardarPaciente() {

    this.formSubmited = true;

    if (this.pacienteForm.invalid) {
      return;
    }
    this.pacienteForm.get('numeroAfiliado').enable();
    const { apellido, nombre } = this.pacienteForm.value;

    if (this.id !== 'nuevo') {

      this.subscriptions.add(this.pacienteService.actualizarPaciente( this.pacienteSeleccionado._id, this.pacienteForm.value)
      .subscribe( (resp: any) => {
        Swal.fire('Actualizado', `Paciente ${apellido}, ${nombre} actualizado correctamente`, 'success');
        this.formSubmited = false;
        this.pacienteForm.reset();
      }, (err) => {
        // si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }));

    } else {
        this.subscriptions.add(this.pacienteService.crearPaciente( this.pacienteForm.value)
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `Paciente ${apellido}, ${nombre} creado correctamente`, 'success');
          this.formSubmited = false;
          this.pacienteForm.reset();
        }, (err) => {
          // si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
        }));
      }
  }

  validarNroAfiliado() {

    const {obraSocial} = this.pacienteForm.value;

    const elemento = this.obrasSociales.findIndex( item => item._id === obraSocial);
    const nombreOS = this.obrasSociales[elemento].nombre;

    if ( nombreOS === 'Particular') {

      this.pacienteForm.get('numeroAfiliado').disable();
      // tslint:disable-next-line: no-string-literal
      this.pacienteForm.controls['numeroAfiliado'].setValue('-');

    } else {

      this.pacienteForm.get('numeroAfiliado').enable();

    }
  }


}
