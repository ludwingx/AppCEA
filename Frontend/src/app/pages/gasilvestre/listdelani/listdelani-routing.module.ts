import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListdelaniPage } from './listdelani.page';

const routes: Routes = [
  {
    path: '',
    component: ListdelaniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListdelaniPageRoutingModule {}
