import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListdelarPage } from './listdelar.page';

const routes: Routes = [
  {
    path: '',
    component: ListdelarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListdelarPageRoutingModule {}
