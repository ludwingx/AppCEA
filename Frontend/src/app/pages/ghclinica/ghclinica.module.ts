import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GhclinicaPageRoutingModule } from './ghclinica-routing.module';

import { GhclinicaPage } from './ghclinica.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    GhclinicaPageRoutingModule
  ],
  declarations: [GhclinicaPage]
})
export class GhclinicaPageModule {}
