import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreararPageRoutingModule } from './crearar-routing.module';

import { CreararPage } from './crearar.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreararPageRoutingModule
  ],
  declarations: [CreararPage]
})
export class CreararPageModule {}
