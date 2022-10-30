import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearasPageRoutingModule } from './crearas-routing.module';

import { CrearasPage } from './crearas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearasPageRoutingModule
  ],
  declarations: [CrearasPage]
})
export class CrearasPageModule {}
