import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { Paciente } from 'src/app/models/paciente.model';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-ver-paciente',
  templateUrl: './ver-paciente.component.html',
  styles: [
  ]
})
export class VerPacienteComponent implements OnInit, OnDestroy {

  public cargando = false;
  public subscriptions = new Subscription();
  public fecha: Date;
  public pacienteSeleccionado: Paciente ;

  constructor( private pacienteService: PacientesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private location: Location) { }

  ngOnInit(): void {

    // me quedo con el ID que viene por parametro y lo uso para llamar al metodo que luego llama al servicio
    this.activatedRoute.params
                       .subscribe( ({id}) => this.cargarPacientePorId(id));
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }

  cargarPacientePorId( id: string) {

    this.cargando = true;
    this.subscriptions.add(this.pacienteService.buscarPacientePorId( id )
        .subscribe( paciente => {

          if (!paciente) {
            return this.router.navigateByUrl('/dashboard/pacientes'); // si no existe(manipulan url) los saco
          }

          this.pacienteSeleccionado = paciente;
          this.cargando = false;
        }));

  }

  guardarHC( histCli: string) {

    this.pacienteSeleccionado.historiaClinica = histCli;
    this.subscriptions.add(this.pacienteService.actualizarPaciente( this.pacienteSeleccionado ).subscribe( resp => {
      Swal.fire('Actualizado', 'Historia Clínica actualizada', 'success');
    }));
  }

  regresar() {
    this.location.back();

  }

}
