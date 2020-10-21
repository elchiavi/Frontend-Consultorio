import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  public menu: any[] = [{
    titulo: 'Mantenimiento',
    icono: 'mdi mdi-folder-lock-open',
    submenu: [
      { titulo: 'Obras Sociales', url: 'obrassociales' },
      { titulo: 'Pacientes', url: 'pacientes' },
      { titulo: 'Turnos', url: '/' },
      { titulo: 'Usuarios', url: 'usuarios'}

    ]
  }];

}
