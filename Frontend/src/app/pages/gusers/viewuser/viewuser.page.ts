import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.page.html',
  styleUrls: ['./viewuser.page.scss'],
})
export class ViewuserPage implements OnInit {
  datos:any
  constructor(private modalCtrl: ModalController,
              private navParam: NavParams) { }

  ngOnInit() {
    this.datos = this.navParam.get("users");
  }
  Cerrar(){
    this.modalCtrl.dismiss()
  }
  
}
