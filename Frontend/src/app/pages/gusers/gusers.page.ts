import { CrearuserPage } from './crearuser/crearuser.page';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ActualizaruserPage } from './actualizaruser/actualizaruser.page';
import { User } from 'src/app/interfaces/usuario';


@Component({
  selector: 'app-gusers',
  templateUrl: './gusers.page.html',
  styleUrls: ['./gusers.page.scss'],
})
export class GusersPage implements OnInit {
  users: User[];
  
  constructor(private conexion: ConexionService,
              private alertCtrl: AlertController,
              private modalCtrl : ModalController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.ListUser()
  }
  doRefresh(event){
    this.ListUser();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }

  ListUser(){
    this.conexion.getdata("usuario.php/?aksi=list-users").subscribe((data:any)=>{
      this.users = data.listUsers
    })
  }
  
  addUser(){
    this.modalCtrl.create({
      component: CrearuserPage
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }

  updateUser(users:any){
    this.modalCtrl.create({
      component: ActualizaruserPage,
      componentProps: { users }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  removeUser(id_usuario:string, nombre_u:string){
    this.alertCtrl.create({
      header: 'Deshabilitar',
      message: '¿Estás seguro de que quieres deshabilitar la cuenta de ' + nombre_u + '?',
      buttons: [{
        text: 'Si',
        handler: () => {
          const body = {
            id_usuario: id_usuario,
            aksi: "delete-user"
          }
          this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
            if (data.success) {
              this.mensaje(data.msg)
            } else {
              this.mensaje(data.msg)
            }this.ListUser()
          })
        }
      },
      {text: 'No'}
    ]
    })
    .then(alertEl => alertEl.present());
  }

}
