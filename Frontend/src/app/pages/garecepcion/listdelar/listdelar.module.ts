import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListdelarPageRoutingModule } from './listdelar-routing.module';

import { ListdelarPage } from './listdelar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListdelarPageRoutingModule
  ],
  declarations: [ListdelarPage]
})
export class ListdelarPageModule {}
