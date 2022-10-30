import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasilvestrePage } from './gasilvestre.page';

const routes: Routes = [
  {
    path: '',
    component: GasilvestrePage
  },
  {
    path: 'crearas',
    loadChildren: () => import('./crearas/crearas.module').then( m => m.CrearasPageModule)
  },
  {
    path: 'updateanimal',
    loadChildren: () => import('./updateanimal/updateanimal.module').then( m => m.UpdateanimalPageModule)
  },
  {
    path: 'listdelani',
    loadChildren: () => import('./listdelani/listdelani.module').then( m => m.ListdelaniPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasilvestrePageRoutingModule {}
