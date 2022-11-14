import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearhcPageRoutingModule } from './crearhc-routing.module';

import { CrearhcPage } from './crearhc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearhcPageRoutingModule
  ],
  declarations: [CrearhcPage]
})
export class CrearhcPageModule {}
