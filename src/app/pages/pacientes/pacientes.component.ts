import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { PacientesService } from '../../services/pacientes.service';
import { BusquedasService } from '../../services/busquedas.service';
import { Paciente } from '../../models/paciente.model';
import Swal from 'sweetalert2';
import { TurnosService } from '../../services/turnos.service';
import { CalendarEvent } from 'angular-calendar';



@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
  ]
})
export class PacientesComponent implements OnInit, OnDestroy {
  
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  public cargando = false;
  public cargandoTurnos = false;
  public pacientes: Paciente[] = [];
  public pacientesFiltrados: Paciente[] = [];
  public paginaDesde = 0;
  public totalPacientes = 0;
  public turnos: CalendarEvent[] = [];
  public subscriptions = new Subscription();

  constructor( public pacientesService: PacientesService,
               public busquedaService: BusquedasService,
               private turnosService: TurnosService,
               public router: Router,
               private modal: NgbModal,
               private modalConfig: NgbModalConfig) {
                this.modalConfig.backdrop = 'static';
                this.modalConfig.keyboard = false;
               }

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

  cargarHistorialDeTurnos(id: string) {

    this.cargandoTurnos = true;
    this.subscriptions.add(this.turnosService.cargarTurnosPorPaciente(id)
          .subscribe(resp => {
            resp.turnos.forEach( event => {
                const fechaStart = new Date(event.start);
                fechaStart.setHours(fechaStart.getHours() + 3);
                event.start = fechaStart;
                const fechaEnd = new Date(event.end);
                fechaEnd.setHours(fechaEnd.getHours() + 3);
                event.end = fechaEnd;
            });
            this.turnos = resp.turnos;
            this.cargandoTurnos = false;
          }));
  }

  verHistorialTurnos(id: string) {    

    this.cargarHistorialDeTurnos(id);
    this.modal.open(this.modalContent, { size: 'lg' });

  }

  cerrarModal() {

    this.modal.dismissAll(this.modalContent);
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
