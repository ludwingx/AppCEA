import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearhcPageRoutingModule } from './crearhc-routing.module';

import { CrearhcPage } from './crearhc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearhcPageRoutingModule
  ],
  declarations: [CrearhcPage]
})
export class CrearhcPageModule {}
