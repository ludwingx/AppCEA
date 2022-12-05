import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListdelhcPage } from './listdelhc.page';

const routes: Routes = [
  {
    path: '',
    component: ListdelhcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListdelhcPageRoutingModule {}
