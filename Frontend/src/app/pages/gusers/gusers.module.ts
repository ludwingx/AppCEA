import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GusersPageRoutingModule } from './gusers-routing.module';

import { GusersPage } from './gusers.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    GusersPageRoutingModule
  ],
  declarations: [GusersPage]
})
export class GusersPageModule {}
