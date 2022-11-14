import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewhistoriaPageRoutingModule } from './viewhistoria-routing.module';

import { ViewhistoriaPage } from './viewhistoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewhistoriaPageRoutingModule
  ],
  declarations: [ViewhistoriaPage]
})
export class ViewhistoriaPageModule {}
