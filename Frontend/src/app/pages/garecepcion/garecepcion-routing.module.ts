import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GarecepcionPage } from './garecepcion.page';

const routes: Routes = [
  {
    path: '',
    component: GarecepcionPage
  },
  {
    path: 'crearar',
    loadChildren: () => import('./crearar/crearar.module').then( m => m.CreararPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarecepcionPageRoutingModule {}
