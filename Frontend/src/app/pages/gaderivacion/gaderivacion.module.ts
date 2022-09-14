import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaderivacionPageRoutingModule } from './gaderivacion-routing.module';

import { GaderivacionPage } from './gaderivacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaderivacionPageRoutingModule
  ],
  declarations: [GaderivacionPage]
})
export class GaderivacionPageModule {}
