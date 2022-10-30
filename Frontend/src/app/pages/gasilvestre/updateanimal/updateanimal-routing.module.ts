import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateanimalPage } from './updateanimal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateanimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateanimalPageRoutingModule {}
