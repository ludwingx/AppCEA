import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GarecepcionPageRoutingModule } from './garecepcion-routing.module';

import { GarecepcionPage } from './garecepcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GarecepcionPageRoutingModule
  ],
  declarations: [GarecepcionPage]
})
export class GarecepcionPageModule {}
