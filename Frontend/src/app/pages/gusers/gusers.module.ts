import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GusersPageRoutingModule } from './gusers-routing.module';

import { GusersPage } from './gusers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GusersPageRoutingModule
  ],
  declarations: [GusersPage]
})
export class GusersPageModule {}
