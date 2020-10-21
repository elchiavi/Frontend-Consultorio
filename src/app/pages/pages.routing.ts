import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ObrasSocialesComponent } from './obras-sociales/obras-sociales.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuarioComponent } from './usuarios/usuario.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard], // agrego para protejer rutas
        children: [
                    {path: '', component: DashboardComponent, data: {titulo: 'Mantenimiento'}}, // ruta por defecto
                    {path: 'pacientes', component: PacientesComponent, data: {titulo: 'Pacientes'} },
                    {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'}},
                    {path: 'usuarios/:id', component: UsuarioComponent, data: {titulo: 'Alta de Usuario'}},
                    {path: 'obrassociales', component: ObrasSocialesComponent, data: {titulo: 'Obras Sociales'}}
                  ],
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
