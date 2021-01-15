import { Component, ViewEncapsulation, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { TurnosService } from '../../services/turnos.service';
import { Paciente } from '../../models/paciente.model';
import { BusquedasService } from '../../services/busquedas.service';
import { Prestacion } from '../../models/prestacion.model';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  }};

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class TurnosComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalContent2', { static: true }) modalContent2: TemplateRef<any>;

  public turnos: CalendarEvent[] = [];
  public turnoSeleccionado: CalendarEvent = null;
  public pacientes: Paciente[] = [];
  public prestaciones: Prestacion[] = [];
  public subscriptions = new Subscription();
  public cargando = false;
  public formSubmited = false;
  public viewDate = new Date();
  weekStartsOn: 0 = 0;

  public turnoForm = this.fb.group({
    title: ['', Validators.required ],
    prestacion: ['', Validators.required ],
    start: ['', Validators.required ],
    end: ['', Validators.required ],
    paciente: ['', Validators.required ]
  });

  constructor(private turnosService: TurnosService,
              private busquedasService: BusquedasService,
              private fb: FormBuilder,
              private modal: NgbModal,
              private modalConfig: NgbModalConfig) {
                this.modalConfig.backdrop = 'static';
                this.modalConfig.keyboard = false;
               }

  ngOnInit(): void {

      this.cargarTurnos();
      this.cargarPacientes();
      this.cargarPrestaciones();
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }

  cargarTurnos() {
    this.cargando = true;
    this.subscriptions.add(this.turnosService.cargarTurnos().subscribe( resp => {
      resp.turnos.forEach( event => {
          const fechaStart = new Date(event.start);
          fechaStart.setHours(fechaStart.getHours() + 3);
          event.start = fechaStart;
          const fechaEnd = new Date(event.end);
          fechaEnd.setHours(fechaEnd.getHours() + 3);
          event.end = fechaEnd;
          if (!event.asistio) {
            event.color = colors.red;
          }
      });
      this.turnos = resp.turnos;
      this.cargando = false;
    }));
  }

  cargarPacientes() {

    this.subscriptions.add(this.busquedasService.cargarPacientesActivos()
    .subscribe( resp => {
          this.pacientes = resp.pacientes;
    }));
  }

  cargarPrestaciones() {

    this.subscriptions.add(this.busquedasService.cargarPrestacionesActivas()
    .subscribe( resp => {
          this.prestaciones = resp.prestaciones;
    }));
  }

  abrirModal() {
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  cerrarModal() {

    this.turnoForm.reset();
    this.turnoSeleccionado = null;
    this.formSubmited = false;
    // this.cargarTurnos();
    this.modal.dismissAll(this.modalContent);
  }

  campoNoValido( campo: string): boolean {

    if (this.turnoForm.get(campo).invalid && this.formSubmited) {
      return true;
    } else{
      return false;
    }

  }

  validarFechas(): boolean {

    const { start } = this.turnoForm.value;
    const { end } = this.turnoForm.value;
    if ( Date.parse(end) < Date.parse(start) ) {
      return true;
    } else {
      return false;
    }
  }

  confirmarAsistencia() {

    this.turnoSeleccionado.asistio = true;
    if (this.turnoSeleccionado !== null) {

      this.subscriptions.add(this.turnosService.confirmarTurno(this.turnoSeleccionado._id, this.turnoSeleccionado.title)
        .subscribe( (resp: any) => {
          Swal.fire('Confirmado', 'Turno confirmado', 'success');
          this.cerrarModal();
          this.cargarTurnos();
        }, (err) => {
          // si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
          console.log(err);
        }));

    }
  }

  crearTurno() {

    this.formSubmited = true;

    if (this.turnoForm.invalid) {
      return;
    }

    if (this.turnoSeleccionado !== null) {

      this.subscriptions.add(this.turnosService.actualizarTurno(this.turnoForm.value, this.turnoSeleccionado._id)
        .subscribe( (resp: any) => {
          Swal.fire('Actualizado', 'Turno actualizado correctamente', 'success');
          this.formSubmited = false;
          this.turnoForm.reset();
          this.cerrarModal();
          this.cargarTurnos();
        }, (err) => {
          // si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
        }));

    } else {
      this.subscriptions.add(this.turnosService.crearTurno( this.turnoForm.value)
        .subscribe( (resp: any) => {
      Swal.fire('Creado', 'Turno creado correctamente', 'success');
      this.formSubmited = false;
      this.turnoForm.reset();
      this.cerrarModal();
      this.cargarTurnos();
    }, (err) => {
      // si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    }));
    }
  }

  turnoClick({ event }: { event: CalendarEvent }) {

    this.turnoSeleccionado = event;
    this.modal.open(this.modalContent2, { size: 'lg' });

  }

  eliminarTurno( event: CalendarEvent ) {

    this.subscriptions.add(this.turnosService.eliminarTurno(event._id).subscribe( resp => {
      Swal.fire('Eliminado', `Turno Eliminado`, 'success');
      this.cerrarModal();
      this.cargarTurnos();
    }));

  }

  actualizarTurno( event: CalendarEvent) {

    const inicio = new Date( event.start);
    const fin = new Date( event.end);
    inicio.setHours(inicio.getHours() - 3);
    fin.setHours(fin.getHours() - 3);

    this.turnoForm.reset(event);
    this.turnoForm.patchValue({['start']: inicio.toISOString().slice(0, 16) } );
    this.turnoForm.patchValue({['end']: fin.toISOString().slice(0, 16)} );
    this.turnoForm.patchValue({['prestacion']: event.prestacion._id});
    this.turnoForm.patchValue({['paciente']: event.paciente._id});
    this.modal.open(this.modalContent, { size: 'lg' });

  }

}
