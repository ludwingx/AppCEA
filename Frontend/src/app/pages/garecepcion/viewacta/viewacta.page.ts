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

  VerActa(id_acta_recepcion:string){
    const body = {
      id_acta_recepcion: id_acta_recepcion,
      aksi: "ver-acta"
    }
    this.conexion.getdata("arecepcion.php/?aksi=ver-acta").subscribe((data:any)=>{
      this.dataActa = data.VerActa
      this.procedente = data.procedente
    })
  }
}
