import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaderivacionPage } from './gaderivacion.page';

const routes: Routes = [
  {
    path: '',
    component: GaderivacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaderivacionPageRoutingModule {}
