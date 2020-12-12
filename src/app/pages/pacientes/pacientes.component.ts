import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PacientesService } from '../../services/pacientes.service';
import { BusquedasService } from '../../services/busquedas.service';
import { Paciente } from '../../models/paciente.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
  ]
})
export class PacientesComponent implements OnInit, OnDestroy {

  public cargando = false;
  public pacientes: Paciente[] = [];
  public pacientesFiltrados: Paciente[] = [];
  public paginaDesde = 0;
  public totalPacientes = 0;
  public subscriptions = new Subscription();

  constructor( public pacientesService: PacientesService,
               public busquedaService: BusquedasService,
               public router: Router) { }

  ngOnInit(): void {

      this.cargarPacientes();
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }

  cargarPacientes() {

    this.cargando = true;
    this.subscriptions.add(this.pacientesService.cargarPacientes( this.paginaDesde )
        .subscribe( resp => {
          this.totalPacientes = resp.total;
          this.pacientes = resp.pacientes;
          this.pacientesFiltrados = resp.pacientes;
          this.cargando = false;
        }));
  }

  buscar( termino: string ) {

    if (termino.length === 0) {
      this.pacientes = this.pacientesFiltrados;
      return;
    }

    if (termino.trim().length === 0) {
      return;
    }

    this.subscriptions.add(this.busquedaService.buscar('pacientes', termino)
        .subscribe( (resultados: any) => {
            this.pacientes = resultados;
        }));
  }

  cambiarPagina( valor: number) {

    this.paginaDesde += valor;

    if ( this.paginaDesde < 0) {
      this.paginaDesde = 0;
    } else if ( this.paginaDesde >= this.totalPacientes) {
      this.paginaDesde -= valor;
    }

    this.cargarPacientes();

  }

  verPaciente( id: string) {

    this.router.navigate(['dashboard/pacientes', id]);

  }

  activarInactivarPaciente( paciente: Paciente ) {

    this.subscriptions.add(this.pacientesService.activarInactivarPaciente( paciente._id, paciente.nombre )
        .subscribe( resp => {
          if ( paciente.activo) {
            Swal.fire('Inactivado', `${paciente.apellido}, ${paciente.nombre} inactivado correctamente`, 'success');
          } else {
            Swal.fire('Activado', `${paciente.apellido}, ${paciente.nombre} activado correctamente`, 'success');
          }
          this.cargarPacientes();
        }, (err) => {
          // si sucede un error
          Swal.fire('Error', err.error.msg, 'error');

        }));
  }

}
