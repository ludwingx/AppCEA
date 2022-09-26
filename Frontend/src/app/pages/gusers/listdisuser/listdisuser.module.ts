import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListdisuserPageRoutingModule } from './listdisuser-routing.module';

import { ListdisuserPage } from './listdisuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListdisuserPageRoutingModule
  ],
  declarations: [ListdisuserPage]
})
export class ListdisuserPageModule {}
