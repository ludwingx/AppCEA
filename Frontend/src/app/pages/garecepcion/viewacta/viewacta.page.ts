import { ConexionService } from './../../../servicios/conexion/conexion.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewacta',
  templateUrl: './viewacta.page.html',
  styleUrls: ['./viewacta.page.scss'],
})
export class ViewactaPage implements OnInit {
  dataActa:any = []
  procedente:any = []
  datos:any
  constructor(private modalCtrl: ModalController,
              private navParam: NavParams,
              private conexion: ConexionService,) { }

  ngOnInit() {

    this.datos = this.navParam.get("arecepcion");
  }
  Cerrar(){
    this.modalCtrl.dismiss()
  }
}
