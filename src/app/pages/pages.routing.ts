import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard], // agrego para protejer rutas
        canLoad: [AuthGuard], // implementar cuando usamos lazy load
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule) // lazy load
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
