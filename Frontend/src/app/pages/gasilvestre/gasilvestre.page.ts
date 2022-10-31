import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Animalsilvestre } from 'src/app/interfaces/animalsilvestre';
import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { CrearasPage } from './crearas/crearas.page';
import { UpdateanimalPage } from './updateanimal/updateanimal.page';
import { ListdelaniPage } from './listdelani/listdelani.page';

@Component({
  selector: 'app-gasilvestre',
  templateUrl: './gasilvestre.page.html',
  styleUrls: ['./gasilvestre.page.scss'],
})
export class GasilvestrePage implements OnInit {
animalsilvestre : any = [];
textoBuscar = '';
  constructor(private conexion: ConexionService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    console.log(this.ListAnimals())
    this.ListAnimals();
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  ListAnimals(){
    this.conexion.getdata("animals.php/?aksi=list-animals").subscribe((data:any)=>{
      this.animalsilvestre = data.listAnimals
    })
  }
  doRefresh(event){
    this.ListAnimals();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  buscar( event ){
    this.textoBuscar = event.detail.value;
  }
  openEliminate(){
    this.modalCtrl.create({
      component: ListdelaniPage,
      // componentProps: { dataUser }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  openModal(){
    this.modalCtrl.create({
      component: CrearasPage,
      // componentProps: { dataUser }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  updateAnimal(animalsilvestre:any){
    this.modalCtrl.create({
      component: UpdateanimalPage,
      componentProps: { animalsilvestre }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  removeAnimal(id_animal_silvestre:string, nom_comun:string){
    this.alertCtrl.create({
      header: 'Desactivar',
      message: '¿Estás seguro de que quieres desactivar de la lista a ' + nom_comun + ' #' + id_animal_silvestre + '?',
      buttons: [{
        text: 'Si',
        handler: () => {
          const body = {
            id_animal_silvestre: id_animal_silvestre,
            aksi: "delete-as"
          }
          this.conexion.postdata(body,"animals.php").subscribe((data:any)=>{
            if (data.success) {
              this.mensaje(data.msg)
            } else {
              this.mensaje(data.msg)
            }this.ListAnimals()
          })
        }
      },
      {text: 'No'}
    ]
    })
    .then(alertEl => alertEl.present());
  }
}
