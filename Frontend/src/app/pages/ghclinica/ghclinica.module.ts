import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GhclinicaPageRoutingModule } from './ghclinica-routing.module';

import { GhclinicaPage } from './ghclinica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GhclinicaPageRoutingModule
  ],
  declarations: [GhclinicaPage]
})
export class GhclinicaPageModule {}
