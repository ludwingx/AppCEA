import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/usuario';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';

@Component({
  selector: 'app-listdisuser',
  templateUrl: './listdisuser.page.html',
  styleUrls: ['./listdisuser.page.scss'],
})
export class ListdisuserPage implements OnInit {
  users: User[];
  constructor(private conexion: ConexionService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  this.ListDisUser()
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  ListDisUser(){
    this.conexion.getdata("usuario.php/?aksi=listDis-users").subscribe((data:any)=>{
      this.users = data.listDisUsers
    })
  }
  enableUser(id_user:string, name:string){
    this.alertCtrl.create({
      header: 'Habilitar',
      message: '¿Estás seguro de que quieres habilitar la cuenta de ' + name + '?',
      buttons: [{
        text: 'Si',
        handler: () => {
          const body = {
            id_user: id_user,
            aksi: "reactivate-user"
            
          }
          this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
            if (data.success) {
              this.mensaje(data.msg)
            } else {
              this.mensaje(data.msg)
            }this.ListDisUser()
          })
        }
      },
      {text: 'No'}
    ]
    })
    .then(alertEl => alertEl.present());
  }


}
