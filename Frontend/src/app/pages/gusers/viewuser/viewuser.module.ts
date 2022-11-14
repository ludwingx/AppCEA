import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewuserPageRoutingModule } from './viewuser-routing.module';

import { ViewuserPage } from './viewuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewuserPageRoutingModule
  ],
  declarations: [ViewuserPage]
})
export class ViewuserPageModule {}
