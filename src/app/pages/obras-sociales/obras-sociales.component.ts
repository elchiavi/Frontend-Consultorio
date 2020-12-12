import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { ObrasSocialesService } from '../../services/obras-sociales.service';
import { ObraSocial } from '../../models/obra-social.model';
import { BusquedasService } from '../../services/busquedas.service';


@Component({
  selector: 'app-obras-sociales',
  templateUrl: './obras-sociales.component.html',
  styles: [
  ]
})
export class ObrasSocialesComponent implements OnInit, OnDestroy {

  public obrasSociales: ObraSocial[] = [];
  public obraSocialesFiltradas: ObraSocial[] = [];
  public paginaDesde = 0;
  public totalObrasSociales = 0;
  public cargando = false;
  public subscriptions = new Subscription();

  constructor( private obraSocService: ObrasSocialesService,
               private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

  }

  ngOnInit(): void {

      this.cargarObrasSociales();
  }

  cargarObrasSociales() {

    this.cargando = true;
    this.subscriptions.add(this.obraSocService.cargarObrasSociales(this.paginaDesde)
    .subscribe( resp => {
      this.totalObrasSociales = resp.total;
      this.obrasSociales = resp.obrasSociales;
      this.obraSocialesFiltradas = resp.obrasSociales;
      this.cargando = false;
    }));

  }

  async crearObraSocial() {

    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Obra Social',
      text: 'Ingrese el nombre de la nueva Obra Social',
      input: 'text',
      inputPlaceholder: 'Nombre de la Obra Social',
      showCancelButton: true
    });

    if (value.trim().length > 0){

      this.subscriptions.add(this.obraSocService.crearObraSocial(value)
          .subscribe( (resp: any) => {
            this.obrasSociales.push(resp);
            this.cargarObrasSociales();
          }));
    }

  }

  activarInactivarObraSocial( obraSoc: ObraSocial ) {

    this.subscriptions.add(this.obraSocService.activarInactivarObraSocial( obraSoc._id, obraSoc.nombre )
        .subscribe( resp => {
          if ( obraSoc.activo) {
            Swal.fire('Inactivada', `${obraSoc.nombre} inactivada correctamente`, 'success');
          } else {
            Swal.fire('Activada', `${obraSoc.nombre} activada correctamente`, 'success');
          }
          this.cargarObrasSociales();
        }, (err) => {
          // si sucede un error
          Swal.fire('Error', err.error.msg, 'error');

        }));
  }

  async actualizarObraSocial( obraSoc: ObraSocial) {

    const {value = ''} = await Swal.fire<string>({
      title: 'Actualizar Obra Social',
      text: 'Ingrese el nombre:',
      input: 'text',
      inputPlaceholder: 'Nuevo nombre de la Obra Social',
      showCancelButton: true
    });

    if (value.trim().length > 0){
      obraSoc.nombre = value;
      this.subscriptions.add(this.obraSocService.actualizarObraSocial( obraSoc._id, obraSoc.nombre ).subscribe( resp => console.log(resp)));
    }
  }

  buscar( termino: string ) {

    if (termino.length === 0) {
      this.obrasSociales = this.obraSocialesFiltradas;
      return;
    }

    if (termino.trim().length === 0) {
      return;
    }

    this.subscriptions.add(this.busquedaService.buscar('obrasSociales', termino)
        .subscribe( (resultados: any) => {
            this.obrasSociales = resultados;
        }));
  }

  cambiarPagina( valor: number) {

    this.paginaDesde += valor;

    if ( this.paginaDesde < 0) {
      this.paginaDesde = 0;
    } else if ( this.paginaDesde >= this.totalObrasSociales) {
      this.paginaDesde -= valor;
    }

    this.cargarObrasSociales();

  }

}
