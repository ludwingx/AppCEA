import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearhcPage } from './crearhc.page';

const routes: Routes = [
  {
    path: '',
    component: CrearhcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearhcPageRoutingModule {}
