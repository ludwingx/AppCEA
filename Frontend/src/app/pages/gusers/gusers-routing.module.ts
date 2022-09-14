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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GusersPageRoutingModule {}
