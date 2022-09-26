import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreararPage } from './crearar.page';

const routes: Routes = [
  {
    path: '',
    component: CreararPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreararPageRoutingModule {}
