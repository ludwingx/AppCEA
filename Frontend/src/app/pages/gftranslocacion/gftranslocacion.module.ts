import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GftranslocacionPageRoutingModule } from './gftranslocacion-routing.module';

import { GftranslocacionPage } from './gftranslocacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GftranslocacionPageRoutingModule
  ],
  declarations: [GftranslocacionPage]
})
export class GftranslocacionPageModule {}
