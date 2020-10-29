import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '');

  }
  // {
  //   titulo: 'Administración',
  //   icono: 'mdi mdi-widgets',
  //   submenu: [
  //     { titulo: 'Obras Sociales', url: 'obrassociales' },
  //     { titulo: 'Pacientes', url: 'pacientes' },
  //     { titulo: 'Usuarios', url: 'usuarios'}

  //   ]
  // },

  // {

  //   titulo: 'Turnos',
  //   icono: 'mdi mdi-bullseye',
  //   submenu: [
  //     { titulo: 'Dashboard', url: '/' },
  //     { titulo: 'Turnos', url: 'turnos' }
  //   ]
  // }



}
