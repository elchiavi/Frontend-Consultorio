import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { CargarPrestacion  } from '../interfaces/cargar-prestacion';
import { Prestacion } from '../models/prestacion.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PrestacionesService {

  constructor(private http: HttpClient) { }

  cargarPrestaciones( desde: number = 0 ) {

    const url = `${base_url}/prestaciones?desde=${desde}`;
    return this.http.get<CargarPrestacion>(url).pipe(
      map( resp => {
        const prestaciones = resp.prestaciones.map(
          prest => new Prestacion( prest.nombre, prest._id, prest.activo, prest.usuario)
        );
        return {
          total: resp.total,
          prestaciones
        };
      } )
    );
  }

  crearPrestacion( nombre: string) {

    const url = `${base_url}/prestaciones`;
    return this.http.post(url, {nombre});
  }

  actualizarPrestacion( id: string, nombre: string) {

    const url = `${base_url}/prestaciones/${id}`;
    return this.http.put(url, {nombre});
  }

  activarInactivarPrestacion( id: string, nombre: string) {

    const url = `${base_url}/prestaciones/inac/${id}`;
    return this.http.put(url, {nombre});
  }


}
