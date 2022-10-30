import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearasPage } from './crearas.page';

const routes: Routes = [
  {
    path: '',
    component: CrearasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearasPageRoutingModule {}
