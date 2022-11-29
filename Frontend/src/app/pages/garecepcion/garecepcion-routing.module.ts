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
  },
  {
    path: 'viewacta',
    loadChildren: () => import('./viewacta/viewacta.module').then( m => m.ViewactaPageModule)
  },
  {
    path: 'updatear',
    loadChildren: () => import('./updatear/updatear.module').then( m => m.UpdatearPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarecepcionPageRoutingModule {}
