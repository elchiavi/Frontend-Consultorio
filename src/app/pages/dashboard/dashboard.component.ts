import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusquedasService } from '../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { TurnosService } from '../../services/turnos.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  public turnosTotales = 0;
  public turnosConAsistencia = 0;
  public turnosSinAsistencia = 0;
  public porcentajeAsistencia = 0;

  public cargando = false;

  public obrasSociales: string[] = [];
  public cantidadPorOs  = new Array(50);

  public tiposPrestaciones: string[] = [];
  public cantidadPorPres  = new Array(20);

  public actual = new Date();
  public meses = new Array ('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
  public subscriptions = new Subscription();

  constructor( private busquedasService: BusquedasService,
               private turnosService: TurnosService) { }

  ngOnInit(): void {

    this.cantidadPorOs.fill(0);
    this.cantidadPorPres.fill(0);
    this.cargarPacientesPorOS();
    this.cargarTipoPrestPorTurno();
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }

  cargarPacientesPorOS() {

    this.cargando = true;
    this.subscriptions.add(this.busquedasService.cargarPacientesActivos().subscribe( resp => {
              resp.pacientes.forEach( paciente => {
                if ( !this.obrasSociales.includes(paciente.obraSocial.nombre)){
                    this.obrasSociales.push(paciente.obraSocial.nombre);
                    this.cantidadPorOs.push(0);
                    }
                const idx = this.obrasSociales.indexOf(paciente.obraSocial.nombre);
                this.cantidadPorOs[idx] ++;

              });
              this.cargando = false;
    }));
  }

  cargarTipoPrestPorTurno() {

    this.cargando = true;
    this.actual = new Date();
    this.subscriptions.add(this.turnosService.cargarTurnos().subscribe( resp => {
      resp.turnos.forEach( event => {
        const fechaStart = new Date(event.start);
        if (fechaStart.getMonth() === this.actual.getMonth()) {
          this.turnosTotales ++;
          if (event.asistio){
            this.turnosConAsistencia ++;
          } else {
            this.turnosSinAsistencia ++;
          }
          if (!this.tiposPrestaciones.includes(event.prestacion.nombre)) {
            this.tiposPrestaciones.push(event.prestacion.nombre);
            this.cantidadPorPres.push(0);
          }
          const id = this.tiposPrestaciones.indexOf(event.prestacion.nombre);
          this.cantidadPorPres[id] ++;
        }
      });
      this.porcentajeAsistencia = this.turnosConAsistencia / this.turnosTotales * 100;
      this.cargando = false;
    }));

  }

}
