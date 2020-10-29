import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public usuariosFiltrados: Usuario[] = [];
  public paginaDesde = 0;
  public totalUsuarios = 0;
  public cargando = false;

  constructor( private usuarioService: UsuarioService,
               private busquedaService: BusquedasService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.paginaDesde)
        .subscribe( usuarios => {
          this.totalUsuarios = usuarios.total;
          this.usuarios = usuarios.usuarios;
          this.usuariosFiltrados = usuarios.usuarios;
          this.cargando = false;

    });

  }

  cambiarRol( usuario: Usuario ) {

    this.usuarioService.guardarUsuario( usuario ).subscribe( resp => console.log(resp));
  }

  async cambiarNombre( usuario: Usuario) {

    const {value = ''} = await Swal.fire<string>({
      title: 'Cambiar nombre del Usuario',
      text: 'Ingrese el nombre:',
      input: 'text',
      inputPlaceholder: 'Nuevo nombre de usuario',
      showCancelButton: true
    });

    if(value.trim().length > 0){
      usuario.nombre = value;
      this.usuarioService.guardarUsuario( usuario ).subscribe( resp => console.log(resp));
      this.cargarUsuarios();
    }
  }

  inactivarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioService.uid ) {
      return Swal.fire('Error', 'No puede inactivarse así mismo', 'error');

    }

    Swal.fire({
      title: 'Activar/Inactivar usuario',
      text: `Está a punto de activar/inactivar al usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, activarlo/inactivarlo'
      }).then((result) => {
          if (result.isConfirmed) {

              this.usuarioService.inactivarUsuario( usuario )
                  .subscribe( resp => {
                    if ( usuario.activo) {
                      Swal.fire('Inactivado', `${usuario.nombre} inactivado correctamente`, 'success');
                    } else {
                      Swal.fire('Activado', `${usuario.nombre} activado correctamente`, 'success');
                    }
                    this.cargarUsuarios();
                  }, (err) => {
                    // si sucede un error
                    Swal.fire('Error', err.error.msg, 'error');
                  });
              }
        });
  }

  buscar( termino: string ) {

    if (termino.length === 0) {
      this.usuarios = this.usuariosFiltrados;
      return;
    }

    if (termino.trim().length === 0) {
      return;
    }

    this.busquedaService.buscar('usuarios', termino)
        .subscribe( (resultados: any) => {
            this.usuarios = resultados;
        });
  }

  cambiarPagina( valor: number) {

    this.paginaDesde += valor;

    if ( this.paginaDesde < 0) {
      this.paginaDesde = 0;
    } else if ( this.paginaDesde >= this.totalUsuarios) {
      this.paginaDesde -= valor;
    }

    this.cargarUsuarios();

  }

}
