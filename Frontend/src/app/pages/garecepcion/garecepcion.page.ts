import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VerActaPage } from '../../modales/ver-acta/ver-acta.page';

@Component({
  selector: 'app-garecepcion',
  templateUrl: './garecepcion.page.html',
  styleUrls: ['./garecepcion.page.scss'],
})
export class GarecepcionPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
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

}
