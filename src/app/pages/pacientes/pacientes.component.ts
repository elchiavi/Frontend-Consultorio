import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { BusquedasService } from '../../services/busquedas.service';
import { Paciente } from '../../models/paciente.model';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styles: [
  ]
})
export class PacientesComponent implements OnInit {

  public cargando = false;
  public pacientes: Paciente[] = [];
  public pacientesFiltrados: Paciente[] = [];
  public paginaDesde = 0;
  public totalPacientes = 0;

  constructor( public pacientesService: PacientesService,
               public busquedaService: BusquedasService,
               public router: Router) { }

  ngOnInit(): void {

      this.cargarPacientes();
  }

  cargarPacientes() {

    this.cargando = true;
    this.pacientesService.cargarPacientes( this.paginaDesde )
        .subscribe( resp => {
          this.totalPacientes = resp.total;
          this.pacientes = resp.pacientes;
          this.pacientesFiltrados = resp.pacientes;
          this.cargando = false;
        });
  }

  buscar( termino: string ) {

    if (termino.length === 0) {
      this.pacientes = this.pacientesFiltrados;
      return;
    }

    if (termino.trim().length === 0) {
      return;
    }

    this.busquedaService.buscar('pacientes', termino)
        .subscribe( (resultados: any) => {
            this.pacientes = resultados;
        });
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

}
