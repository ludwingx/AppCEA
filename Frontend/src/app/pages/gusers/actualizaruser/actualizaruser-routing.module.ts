import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizaruserPage } from './actualizaruser.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizaruserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizaruserPageRoutingModule {}
