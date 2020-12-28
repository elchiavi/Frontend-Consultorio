import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Turno } from '../models/turno.model';
import { CargarTurno } from '../interfaces/cargar-turno';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor( private http: HttpClient) { }

  cargarTurnos() {

    const url = `${base_url}/turnos`;
    return this.http.get<CargarTurno>(url).pipe(
      map( (resp => {
        return resp;
       })
    ));

  }

  crearTurno( data: Turno) {

    return this.http.post(`${base_url}/turnos`, data);

  }

  eliminarTurno( id: string) {

    const url = `${base_url}/turnos/${id}`;
    return this.http.delete(url);

  }

  actualizarTurno( data: Turno, id: string ) {

    const url = `${base_url}/turnos/${id}`;
    return this.http.put(url, data);

  }

  confirmarTurno( id: string, nombre: string ) {

    const url = `${base_url}/turnos/confirmar/${id}`;
    return this.http.put(url, {nombre});



  }


}
