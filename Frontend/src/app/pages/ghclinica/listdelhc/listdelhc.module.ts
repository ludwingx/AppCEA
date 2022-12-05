import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListdelhcPageRoutingModule } from './listdelhc-routing.module';

import { ListdelhcPage } from './listdelhc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListdelhcPageRoutingModule
  ],
  declarations: [ListdelhcPage]
})
export class ListdelhcPageModule {}
