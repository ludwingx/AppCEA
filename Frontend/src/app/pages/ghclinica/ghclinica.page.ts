import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Animalsilvestre } from 'src/app/interfaces/animalsilvestre';
import { Hclinica } from 'src/app/interfaces/hclinica';

import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { ViewhistoriaPage } from './viewhistoria/viewhistoria.page';
import { UpdatehcPage } from './updatehc/updatehc.page';

@Component({
  selector: 'app-ghclinica',
  templateUrl: './ghclinica.page.html',
  styleUrls: ['./ghclinica.page.scss'],
})
export class GhclinicaPage implements OnInit {
  hclinica: Hclinica[];
  textoBuscar = '';
  constructor(private conexion: ConexionService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  ngOnInit(){
    this.ListHistoria();
  }

  ListHistoria(){
    this.conexion.getdata("hclinica.php/?aksi=list-hclinica").subscribe((data:any)=>{
      this.hclinica = data.listHclinica
    })
  }
  verHistoria(historia:any){
    this.modalCtrl.create({
      component: ViewhistoriaPage,
      componentProps: { historia }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  buscar( event ){
    this.textoBuscar = event.detail.value;
  }
  updateHc(arecepcion:any){
    this.modalCtrl.create({
      component: UpdatehcPage,
      componentProps: { arecepcion }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  removeHc(id_acta_recepcion:string, num_acta_ar:string){
    this.alertCtrl.create({
      header: 'Desactivar',
      message: '¿Estás seguro de que quieres desactivar la Historia Clínica de ' + num_acta_ar + ' #' + id_acta_recepcion + '?',
      buttons: [{
        text: 'Si',
        handler: () => {
          const body = {
            id_animal_silvestre: id_acta_recepcion,
            aksi: "delete-as"
          }
          this.conexion.postdata(body,"arecepcion.php").subscribe((data:any)=>{
            if (data.success) {
              this.mensaje(data.msg)
            } else {
              this.mensaje(data.msg)
            }this.ListHistoria()
          })
        }
      },
      {text: 'No'}
    ]
    })
    .then(alertEl => alertEl.present());
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
}