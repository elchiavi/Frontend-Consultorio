import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ObrasSocialesComponent } from './obras-sociales/obras-sociales.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { TurnosComponent } from './turnos/turnos.component';
import { VerPacienteComponent } from './ver-paciente/ver-paciente.component';
import { NewPacienteComponent } from './pacientes/new-paciente.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    UsuariosComponent,
    PacientesComponent,
    ObrasSocialesComponent,
    UsuarioComponent,
    TurnosComponent,
    VerPacienteComponent,
    NewPacienteComponent
  ],
  exports: [
      DashboardComponent,
      PagesComponent,
      ObrasSocialesComponent,
      PacientesComponent,
      UsuariosComponent,
      TurnosComponent,
      VerPacienteComponent,
      NewPacienteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
