import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListdelaniPageRoutingModule } from './listdelani-routing.module';

import { ListdelaniPage } from './listdelani.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListdelaniPageRoutingModule
  ],
  declarations: [ListdelaniPage]
})
export class ListdelaniPageModule {}
