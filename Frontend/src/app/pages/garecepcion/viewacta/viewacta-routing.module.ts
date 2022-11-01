import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewactaPage } from './viewacta.page';

const routes: Routes = [
  {
    path: '',
    component: ViewactaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewactaPageRoutingModule {}
