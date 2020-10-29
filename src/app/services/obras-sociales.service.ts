import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ObraSocial } from '../models/obra-social.model';
import { CargarObraSocial } from '../interfaces/cargar-obra-social';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ObrasSocialesService {

  constructor( private http: HttpClient) { }

  cargarObrasSociales( desde: number = 0 ) {

    const url = `${base_url}/obrassociales?desde=${desde}`;
    return this.http.get<CargarObraSocial>(url).pipe(
      map( resp => {
        const obrasSociales = resp.obrasSociales.map(
          oSocial => new ObraSocial( oSocial.nombre, oSocial._id, oSocial.activo, oSocial.usuario)
        );
        return {
          total: resp.total,
          obrasSociales
        };
      } )
    );
  }

  crearObraSocial( nombre: string) {

    const url = `${base_url}/obrassociales`;
    return this.http.post(url, {nombre});
  }

  actualizarObraSocial( id: string, nombre: string) {

    const url = `${base_url}/obrassociales/${id}`;
    return this.http.put(url, {nombre});
  }

  activarInactivarObraSocial( id: string, nombre: string) {

    const url = `${base_url}/obrassociales/inac/${id}`;
    return this.http.put(url, {nombre});
  }

}
