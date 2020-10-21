import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public totalUsuarios: number;
  public cargando = false;

  constructor( private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this.cargando = true;
    this.usuarioService.cargarUsuarios()
        .subscribe( usuarios => {

          this.usuarios = usuarios.usuarios;
          this.totalUsuarios = usuarios.total;
          this.cargando = false;

    });

  }


  cambiarRol( usuario: Usuario) {

    this.usuarioService.guardarUsuario( usuario ).subscribe( resp => console.log(resp));
  }

}
