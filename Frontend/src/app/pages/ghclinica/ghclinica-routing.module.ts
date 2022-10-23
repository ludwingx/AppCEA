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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GhclinicaPageRoutingModule {}
