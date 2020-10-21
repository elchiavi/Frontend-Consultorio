import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ObrasSocialesComponent } from './obras-sociales/obras-sociales.component';
import { UsuarioComponent } from './usuarios/usuario.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    UsuariosComponent,
    PacientesComponent,
    ObrasSocialesComponent,
    UsuarioComponent
  ],
  exports: [
      DashboardComponent,
      PagesComponent,
      ObrasSocialesComponent,
      PacientesComponent,
      UsuariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class PagesModule { }
