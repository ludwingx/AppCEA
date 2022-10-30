import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VerActaPage } from '../../modales/ver-acta/ver-acta.page';
import { CreararPage } from './crearar/crearar.page';

@Component({
  selector: 'app-garecepcion',
  templateUrl: './garecepcion.page.html',
  styleUrls: ['./garecepcion.page.scss'],
})
export class GarecepcionPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  openCrearar(){
    this.modalCtrl.create({
      component: CreararPage,
      // componentProps: { dataUser }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
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
