import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuario';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router) { }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.rol;
  }

  guardarLocalStorage( token: string, menu: any) {

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu)); // no puedo guardar otra cosa que no sea string, por eso lo transformo

  }

  cargarUsuarios( desde: number = 0) {

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url).pipe(
      map( resp => {
        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre, user.email, '',  user.google, user.rol, user.uid)
        );
        return {
          total: resp.total,
          usuarios
        };
      })
    );

  }

  guardarUsuario( usuario: Usuario) {

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario);
  }



  login( formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
               .pipe(
                  tap( (resp: any) => {
                    this.guardarLocalStorage(resp.token, resp.menu);
                  })
                );

  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`).pipe(
             map( (resp: any) => {
                const {email, google, nombre, rol, uid} = resp.usuario;
                this.usuario = new Usuario(nombre, email, '', google, rol, uid);
                //  si hay token devuelvo true, para permitir el acceso.
                this.guardarLocalStorage(resp.token, resp.menu);
                return true;
              }),
              catchError( err => of(false)) // creo un observable en falso para atrapar el error,
            //                               // en este caso false porque no pudo validar el token
           );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');

  }

}
