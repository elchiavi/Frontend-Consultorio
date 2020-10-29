import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Paciente } from '../models/paciente.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor( private http: HttpClient) { }


  cargarPacientes(desde: number = 0) {

    const url = `${base_url}/pacientes?desde=${desde}`;
    return this.http.get(url).pipe(
      map( (resp: { pacientes: Paciente[], total: number}) => {
        return {
          total: resp.total,
          pacientes: resp.pacientes
        };
      })
    );
  }

  buscarPacientePorId( id: string) {

    const url = `${base_url}/pacientes/${id}`;
    return this.http.get(url).pipe(
                map( (resp: {ok: boolean, paciente: Paciente}) => resp.paciente));

  }

  actualizarPaciente( paciente: Paciente) {

    return this.http.put(`${base_url}/pacientes/${paciente._id}`, paciente);
  }

  crearPaciente( data: Paciente) {

    return this.http.post(`${base_url}/pacientes`, data);
  }


}
