import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Animalsilvestre } from 'src/app/interfaces/animalsilvestre';
import { Hclinica } from 'src/app/interfaces/hclinica';

import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { ViewhistoriaPage } from './viewhistoria/viewhistoria.page';
import { UpdatehcPage } from './updatehc/updatehc.page';
import { ListdelhcPage } from './listdelhc/listdelhc.page';

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
      console.log(this.hclinica)
    })
  }
  doRefresh(event){
    this.ListHistoria();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  openEliminate(){
    this.modalCtrl.create({
      component: ListdelhcPage,
      // componentProps: { dataUser }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
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
  removeHc(id_historia_clinica:string, nom_comun:string){
    this.alertCtrl.create({
      header: 'Desactivar',
      message: '¿Estás seguro de que quieres desactivar la Historia Clínica de ' + nom_comun + ' #' + id_historia_clinica + '?',
      buttons: [{
        text: 'Si',
        handler: () => {
          const body = {
            id_historia_clinica: id_historia_clinica,
            aksi: "deshabilitar-hc"
          }
          this.conexion.postdata(body,"hclinica.php").subscribe((data:any)=>{
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