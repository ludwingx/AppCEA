import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GusersPage } from './gusers.page';

const routes: Routes = [
  {
    path: '',
    component: GusersPage
  },
  {
    path: 'crearuser',
    loadChildren: () => import('./crearuser/crearuser.module').then( m => m.CrearuserPageModule)
  },
  {
    path: 'actualizaruser',
    loadChildren: () => import('./actualizaruser/actualizaruser.module').then( m => m.ActualizaruserPageModule)
  },
  {
    path: 'listdisuser',
    loadChildren: () => import('./listdisuser/listdisuser.module').then( m => m.ListdisuserPageModule)
  },
  {
    path: 'viewuser',
    loadChildren: () => import('./viewuser/viewuser.module').then( m => m.ViewuserPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GusersPageRoutingModule {}
