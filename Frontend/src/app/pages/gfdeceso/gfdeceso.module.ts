import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GfdecesoPageRoutingModule } from './gfdeceso-routing.module';

import { GfdecesoPage } from './gfdeceso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GfdecesoPageRoutingModule
  ],
  declarations: [GfdecesoPage]
})
export class GfdecesoPageModule {}
