import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatehcPage } from './updatehc.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatehcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatehcPageRoutingModule {}
