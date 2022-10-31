import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { Arecepcion } from './../../interfaces/arecepcion';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VerActaPage } from '../../modales/ver-acta/ver-acta.page';

@Component({
  selector: 'app-garecepcion',
  templateUrl: './garecepcion.page.html',
  styleUrls: ['./garecepcion.page.scss'],
})
export class GarecepcionPage implements OnInit {
arecepcion: Arecepcion[];
  constructor(private modalCtrl: ModalController,
    private conexion: ConexionService) { }

  ngOnInit() {
    this.ListActa();
  }

  async ModalVerActa(){
    const modal = await this.modalCtrl.create({
      component: VerActaPage,
      cssClass: "modal-registro-evento"
    })
    modal.onDidDismiss().then(rest =>{
    })
    return await modal.present()
  }
  ListActa(){
    this.conexion.getdata("animals.php/?aksi=list-ar").subscribe((data:any)=>{
      this.arecepcion = data.listAr
    })
  }

}
