import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { Arecepcion } from './../../interfaces/arecepcion';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { VerActaPage } from '../../modales/ver-acta/ver-acta.page';
import { ViewactaPage } from './viewacta/viewacta.page';
import { UpdatearPage } from './updatear/updatear.page';
import { ListdelarPage } from './listdelar/listdelar.page';

@Component({
  selector: 'app-garecepcion',
  templateUrl: './garecepcion.page.html',
  styleUrls: ['./garecepcion.page.scss'],
})
export class GarecepcionPage implements OnInit {
  arecepcion : Arecepcion [];
  textoBuscar = '';
  constructor(private modalCtrl: ModalController,
    private conexion: ConexionService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.ListActa();

  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  doRefresh(event){
    this.ListActa();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
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
    this.conexion.getdata("arecepcion.php/?aksi=list-arecepcion").subscribe((data:any)=>{
      this.arecepcion = data.listArecepcion
      console.log(this.arecepcion)
    })
  }
  buscar( event ){
    this.textoBuscar = event.detail.value;
  }
  verActa(arecepcion:any){
    this.modalCtrl.create({
      component: ViewactaPage,
      componentProps: { arecepcion }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  openEliminate(){
    this.modalCtrl.create({
      component: ListdelarPage,
      // componentProps: { dataUser }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  updateAr(arecepcion:any){
    this.modalCtrl.create({
      component: UpdatearPage,
      componentProps: { arecepcion }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  removeAr(id_acta_recepcion:string, num_acta_ar:string){
    this.alertCtrl.create({
      header: 'Desactivar',
      message: '¿Estás seguro de que quieres desactivar ' + num_acta_ar + ' #' + id_acta_recepcion + '?',
      buttons: [{
        text: 'Si',
        handler: () => {
          const body = {
            id_acta_recepcion: id_acta_recepcion,
            aksi: "delete-ar"
          }
          this.conexion.postdata(body,"arecepcion.php").subscribe((data:any)=>{
            if (data.success) {
              this.mensaje(data.msg)
            } else {
              this.mensaje(data.msg)
            }this.ListActa()
          })
        }
      },
      {text: 'No'}
    ]
    })
    .then(alertEl => alertEl.present());
  }
}
