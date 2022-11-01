import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewactaPageRoutingModule } from './viewacta-routing.module';

import { ViewactaPage } from './viewacta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewactaPageRoutingModule
  ],
  declarations: [ViewactaPage]
})
export class ViewactaPageModule {}
