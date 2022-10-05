import { EditPage } from './edit/edit.page';
import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { Storage } from "@capacitor/storage";
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  users: any=[
    {
      foto: ""
    }
  ];
  dataStorage:any
  dataUser:any = []
  constructor(private conexion: ConexionService,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController) { }

  ngOnInit() { 
    // Camera.requestPermissions({permissions:['photos']})
    Storage.get({key: "session_user"}).then((data:any)=>{
      this.dataStorage = JSON.parse(data.value)
      this.perfil(this.dataStorage.id)
    })
    console.log(this.perfil);
  }
  perfil(id:string){
    const body = {
      id_user: id,
      aksi: "profile-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
    this.dataUser = data.result;
    })
  }
  editProfile(dataUser:any){
    this.modalCtrl.create({
      component: EditPage,
      componentProps: { dataUser }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }

}
