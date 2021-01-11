import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prestacion } from 'src/app/models/prestacion.model';
import { PrestacionesService } from '../../services/prestaciones.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-prestaciones',
  templateUrl: './prestaciones.component.html',
  styles: [
  ]
})
export class PrestacionesComponent implements OnInit, OnDestroy {

  public prestaciones: Prestacion[] = [];
  public prestacionesFiltradas: Prestacion[] = [];
  public paginaDesde = 0;
  public totalPrestaciones = 0;
  public cargando = false;
  public subscriptions = new Subscription();

  constructor( private prestacionesService: PrestacionesService,
               private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }

  ngOnInit(): void {

    this.cargarPrestaciones();
  }

  cargarPrestaciones() {

    this.cargando = true;
    this.subscriptions.add(this.prestacionesService.cargarPrestaciones(this.paginaDesde)
    .subscribe( resp => {
      this.totalPrestaciones = resp.total;
      this.prestaciones = resp.prestaciones;
      this.prestacionesFiltradas = resp.prestaciones;
      this.cargando = false;
    }));

  }

  async crearPrestacion() {

    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Prestación',
      text: 'Ingrese el nombre de la nueva Prestación',
      input: 'text',
      inputPlaceholder: 'Nombre de la Prestación',
      showCancelButton: true
    });

    if (value.trim().length > 0){

      this.subscriptions.add(this.prestacionesService.crearPrestacion(value)
          .subscribe( (resp: any) => {
            this.prestaciones.push(resp);
            Swal.fire('Creada', `${value} creada correctamente`, 'success');
            this.cargarPrestaciones();
          }));
    }

  }

  activarInactivarPrestacion( prestacion: Prestacion ) {

    this.subscriptions.add(this.prestacionesService.activarInactivarPrestacion( prestacion._id, prestacion.nombre )
        .subscribe( resp => {
          if ( prestacion.activo) {
            Swal.fire('Inactivada', `${prestacion.nombre} inactivada correctamente`, 'success');
          } else {
            Swal.fire('Activada', `${prestacion.nombre} activada correctamente`, 'success');
          }
          this.cargarPrestaciones();
        }, (err) => {
          // si sucede un error
          Swal.fire('Error', err.error.msg, 'error');

        }));
  }

  async actualizarPrestacion( prestacion: Prestacion ) {

    const {value = ''} = await Swal.fire<string>({
      title: 'Actualizar Prestación',
      text: 'Ingrese el nombre:',
      input: 'text',
      inputPlaceholder: 'Nuevo nombre de la Prestación',
      showCancelButton: true
    });

    if (value.trim().length > 0){
      prestacion.nombre = value;
      this.subscriptions.add(this.prestacionesService.actualizarPrestacion( prestacion._id, prestacion.nombre )
                        .subscribe( resp => console.log(resp)));
    }
  }

  buscar( termino: string ) {

    if (termino.length === 0) {
      this.prestaciones = this.prestacionesFiltradas;
      return;
    }

    if (termino.trim().length === 0) {
      return;
    }

    this.subscriptions.add(this.busquedaService.buscar('prestaciones', termino)
        .subscribe( (resultados: any) => {
            this.prestaciones = resultados;
        }));
  }

  cambiarPagina( valor: number) {

    this.paginaDesde += valor;

    if ( this.paginaDesde < 0) {
      this.paginaDesde = 0;
    } else if ( this.paginaDesde >= this.totalPrestaciones) {
      this.paginaDesde -= valor;
    }

    this.cargarPrestaciones();

  }

}
