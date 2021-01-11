import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

// Calendar
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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

import { GraficsModule } from '../grafics/grafics.module';
import { SettingsComponent } from './settings/settings.component';
import { PrestacionesComponent } from './prestaciones/prestaciones.component';


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
    NewPacienteComponent,
    SettingsComponent,
    PrestacionesComponent
  ],
  exports: [
      DashboardComponent,
      PagesComponent,
      ObrasSocialesComponent,
      PacientesComponent,
      UsuariosComponent,
      TurnosComponent,
      VerPacienteComponent,
      NewPacienteComponent,
      SettingsComponent,
      PrestacionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GraficsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ]
})
export class PagesModule { }
