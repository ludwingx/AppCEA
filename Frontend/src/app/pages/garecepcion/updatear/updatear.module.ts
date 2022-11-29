import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatearPageRoutingModule } from './updatear-routing.module';

import { UpdatearPage } from './updatear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatearPageRoutingModule
  ],
  declarations: [UpdatearPage]
})
export class UpdatearPageModule {}
