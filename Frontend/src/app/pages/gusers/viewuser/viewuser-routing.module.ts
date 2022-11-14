import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewuserPage } from './viewuser.page';

const routes: Routes = [
  {
    path: '',
    component: ViewuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewuserPageRoutingModule {}
