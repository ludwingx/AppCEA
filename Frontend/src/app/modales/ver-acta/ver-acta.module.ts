import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerActaPageRoutingModule } from './ver-acta-routing.module';

import { VerActaPage } from './ver-acta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerActaPageRoutingModule
  ],
  declarations: [VerActaPage]
})
export class VerActaPageModule {}
