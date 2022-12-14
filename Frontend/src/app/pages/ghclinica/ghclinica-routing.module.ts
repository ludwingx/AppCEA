import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GhclinicaPage } from './ghclinica.page';

const routes: Routes = [
  {
    path: '',
    component: GhclinicaPage
  },  {
    path: 'crearhc',
    loadChildren: () => import('./crearhc/crearhc.module').then( m => m.CrearhcPageModule)
  },
  {
    path: 'viewhistoria',
    loadChildren: () => import('./viewhistoria/viewhistoria.module').then( m => m.ViewhistoriaPageModule)
  },
  {
    path: 'updatehc',
    loadChildren: () => import('./updatehc/updatehc.module').then( m => m.UpdatehcPageModule)
  },
  {
    path: 'listdelhc',
    loadChildren: () => import('./listdelhc/listdelhc.module').then( m => m.ListdelhcPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GhclinicaPageRoutingModule {}
