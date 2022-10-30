import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasilvestrePageRoutingModule } from './gasilvestre-routing.module';

import { GasilvestrePage } from './gasilvestre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    GasilvestrePageRoutingModule
  ],
  declarations: [GasilvestrePage]
})
export class GasilvestrePageModule {}
