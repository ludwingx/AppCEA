import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatehcPageRoutingModule } from './updatehc-routing.module';

import { UpdatehcPage } from './updatehc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatehcPageRoutingModule
  ],
  declarations: [UpdatehcPage]
})
export class UpdatehcPageModule {}
