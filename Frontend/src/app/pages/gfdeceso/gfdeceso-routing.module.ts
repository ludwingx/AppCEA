import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GfdecesoPage } from './gfdeceso.page';

const routes: Routes = [
  {
    path: '',
    component: GfdecesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GfdecesoPageRoutingModule {}
