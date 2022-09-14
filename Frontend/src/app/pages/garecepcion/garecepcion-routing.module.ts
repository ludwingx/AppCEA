import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GarecepcionPage } from './garecepcion.page';

const routes: Routes = [
  {
    path: '',
    component: GarecepcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarecepcionPageRoutingModule {}
