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

  removeUser(id_user:string){
    this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estás seguro de que quieres eliminar el usuario?',
      buttons: [{
        text: 'Si',
        handler: () => {
          const body = {
            id_user: id_user,
            aksi: "delete-user"
          }
          this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
            if (data.success) {
              this.mensaje(data.msg)
            } else {
              this.mensaje(data.msg)
            }
          })
        }
      },
      {text: 'No'}
    ]
    })
    .then(alertEl => alertEl.present());
  }

}
