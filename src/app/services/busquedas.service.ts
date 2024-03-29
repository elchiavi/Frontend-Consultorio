import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { Paciente } from '../models/paciente.model';
import { ObraSocial } from '../models/obra-social.model';
import { CargarObraSocial } from '../interfaces/cargar-obra-social';
import { Prestacion } from '../models/prestacion.model';
import { CargarPrestacion } from '../interfaces/cargar-prestacion';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }


  buscar( tipo: 'usuarios'| 'pacientes' | 'obrasSociales' | 'prestaciones', termino: string) {

    const url = `${base_url}/busquedas/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url)
               .pipe(
                 map( (resp: any ) => {
                   switch ( tipo ){
                     case 'usuarios':
                       return this.transformarUsuarios(resp.resultados);
                     case 'obrasSociales':
                       return this.transformarObraSocial(resp.resultados);
                     case 'prestaciones':
                       return this.transformarPrestacion(resp.resultados);
                     case 'pacientes':
                       return this.transformarPaciente(resp.resultados);

                    default:
                      return[];
                   }}
                ));
  }

  busquedaGlobal ( termino: string) {

    const url = `${base_url}/busquedas/${termino}`;
    return this.http.get(url);

  }

  private transformarUsuarios( resultados: any[]): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.activo, user.google, user.rol, user.uid)
    );

  }

  private transformarPrestacion( resultados: any[]): Prestacion[] {

    return resultados.map(
      prest => new Prestacion( prest.nombre, prest._id, prest.activo, prest.usuario )
    );

  }

  private transformarObraSocial( resultados: any[]): ObraSocial[] {

    return resultados.map(
      obraSoc => new ObraSocial( obraSoc.nombre, obraSoc._id, obraSoc.activo, obraSoc.usuario )
    );

  }

  private transformarPaciente( resultados: any[]): Paciente[] {

    return resultados.map(
      pac => new Paciente( pac.nombre, pac.apellido, pac.dni, pac.email, pac.fecha, pac.sexo, pac.direccion,
                           pac.telefono, pac.ciudad, pac.obraSocial, pac.numeroAfiliado,
                           pac.historiaClinica, pac.activo, pac.usuario, pac._id  )
    );

  }

  cargarObrasSocialesActivas() {

    const url = `${base_url}/busquedas/obrasSociales/activas`;
    return this.http.get<CargarObraSocial>(url).pipe(
      map( (resp => {
        return resp.obrasSociales;
       })
    ));
  }

  cargarPrestacionesActivas() {

    const url = `${base_url}/busquedas/prestaciones/activas`;
    return this.http.get(url).pipe(
      map( (resp: { prestaciones: Prestacion[], total: number}) => {
        return {
          total: resp.total,
          prestaciones: resp.prestaciones
        };
      })
    );
  }

  cargarPacientesActivos() {

    const url = `${base_url}/busquedas/pacientes/activos`;
    return this.http.get(url).pipe(
      map( (resp: { pacientes: Paciente[], total: number}) => {
        return {
          total: resp.total,
          pacientes: resp.pacientes
        };
      })
    );
  }

}



