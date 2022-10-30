import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConexionService } from '../../servicios/conexion/conexion.service';

@Component({
  selector: 'app-ver-acta',
  templateUrl: './ver-acta.page.html',
  styleUrls: ['./ver-acta.page.scss'],
})
export class VerActaPage implements OnInit {
  dataActa:any = []
  procedente:any = []
  mostrar = false
  nro_acta:string = ""
  constructor(private modalCtrl: ModalController,
              private conexion: ConexionService) { }

  ngOnInit() {
    this.VerActa()
  }

  Cerrar(){
    this.modalCtrl.dismiss()
  }

  VerActa(){
    const body = {
      nro_acta: this.nro_acta,
      aksi: "ver-acta"
    }
    this.conexion.postdata(body, "arecepcion.php").subscribe((data:any)=>{
      if (data.success) {
        this.dataActa = data.VerActa
        this.procedente = data.procedente
        this.mostrar = true
      } else {
        console.log(body);
      }
    })
  }

}
