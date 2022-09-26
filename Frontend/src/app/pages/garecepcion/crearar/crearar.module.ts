import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
imports: [CommonModule]
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreararPageRoutingModule } from './crearar-routing.module';

import { CreararPage } from './crearar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreararPageRoutingModule
  ],
  declarations: [CreararPage]
})
export class CreararPageModule {}
