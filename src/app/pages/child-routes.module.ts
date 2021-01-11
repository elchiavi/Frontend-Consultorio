import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { VerPacienteComponent } from './ver-paciente/ver-paciente.component';
import { NewPacienteComponent } from './pacientes/new-paciente.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { ObrasSocialesComponent } from './obras-sociales/obras-sociales.component';
import { TurnosComponent } from './turnos/turnos.component';
import { SettingsComponent } from './settings/settings.component';
import { PrestacionesComponent } from './prestaciones/prestaciones.component';

const childRoutes: Routes = [
                    {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}}, // ruta por defecto
                    {path: 'pacientes', component: PacientesComponent, data: {titulo: 'Pacientes'} },
                    {path: 'pacientes/paciente/:id', component: NewPacienteComponent, data: {titulo: 'Ver Paciente'} },
                    {path: 'pacientes/:id', component: VerPacienteComponent, data: {titulo: 'Ver Paciente'} },
                    {path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: {titulo: 'Usuarios'}},
                    {path: 'usuarios/:id', canActivate: [ AdminGuard ], component: UsuarioComponent, data: {titulo: 'Alta de Usuario'}},
                    {path: 'obrassociales', component: ObrasSocialesComponent, data: {titulo: 'Obras Sociales'}},
                    {path: 'turnos', component: TurnosComponent, data: {titulo: 'Turnos'}},
                    {path: 'configuraciones', component: SettingsComponent, data: {titulo: 'Configuraciones'}},
                    {path: 'prestaciones', component: PrestacionesComponent, data: {titulo: 'Prestaciones'}}

];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
