import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ObrasSocialesComponent } from './obras-sociales/obras-sociales.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { TurnosComponent } from './turnos/turnos.component';
import { VerPacienteComponent } from './ver-paciente/ver-paciente.component';
import { NewPacienteComponent } from './pacientes/new-paciente.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard], // agrego para protejer rutas
        children: [
                    {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}}, // ruta por defecto
                    {path: 'pacientes', component: PacientesComponent, data: {titulo: 'Pacientes'} },
                    {path: 'pacientes/paciente/:id', component: NewPacienteComponent, data: {titulo: 'Ver Paciente'} },
                    {path: 'pacientes/:id', component: VerPacienteComponent, data: {titulo: 'Ver Paciente'} },
                    {path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: {titulo: 'Usuarios'}},
                    {path: 'usuarios/:id', canActivate: [ AdminGuard ], component: UsuarioComponent, data: {titulo: 'Alta de Usuario'}},
                    {path: 'obrassociales', component: ObrasSocialesComponent, data: {titulo: 'Obras Sociales'}},
                    {path: 'turnos', component: TurnosComponent, data: {titulo: 'Turnos'}}
                  ],
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
