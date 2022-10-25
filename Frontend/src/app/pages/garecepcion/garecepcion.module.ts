import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GarecepcionPageRoutingModule } from './garecepcion-routing.module';

import { GarecepcionPage } from './garecepcion.page';
import { VerActaPage } from '../../modales/ver-acta/ver-acta.page';
import { VerActaPageModule } from '../../modales/ver-acta/ver-acta.module';

@NgModule({
  entryComponents:[
    VerActaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    VerActaPageModule,
    IonicModule,
    GarecepcionPageRoutingModule
  ],
  declarations: [GarecepcionPage]
})
export class GarecepcionPageModule {}
