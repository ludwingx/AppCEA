import { ConexionService } from './../../../servicios/conexion/conexion.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewacta',
  templateUrl: './viewacta.page.html',
  styleUrls: ['./viewacta.page.scss'],
})
export class ViewactaPage implements OnInit {
  dataActa:any = []
  procedente:any = []
  constructor(private modalCtrl: ModalController,
              private conexion: ConexionService,) { }

  ngOnInit() {
    this.VerActa()
  }
  Cerrar(){
    this.modalCtrl.dismiss()
  }

  VerActa(){
    // const body = {
    //   nro_acta: this.nro_acta,
    //   aksi: "ver-acta"
    // }
    this.conexion.getdata("arecepcion.php/?aksi=list-arecepcion").subscribe((data:any)=>{
      this.dataActa = data.listArecepcion
    })
  }
}
