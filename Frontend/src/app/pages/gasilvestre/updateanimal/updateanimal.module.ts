import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateanimalPageRoutingModule } from './updateanimal-routing.module';

import { UpdateanimalPage } from './updateanimal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateanimalPageRoutingModule
  ],
  declarations: [UpdateanimalPage]
})
export class UpdateanimalPageModule {}
