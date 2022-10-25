import { EditPage } from './edit/edit.page';
import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  users: any=[
    {
      foto_u: ""
    }
  ];
  dataStorage:any
  dataUser:any = []
  constructor(private conexion: ConexionService,
              private modalCtrl: ModalController,
              public loadingController: LoadingController) { }

  ngOnInit() { 
    this.presentLoadingWithOptions();
    // Camera.requestPermissions({permissions:['photos']})
    Preferences.get({key: "session_user"}).then((data:any)=>{
      this.dataStorage = JSON.parse(data.value);
      this.perfil(this.dataStorage.id_usuario);
    })
  }
  closeModal(){
    this.modalCtrl.dismiss(null,'close');

  }
  perfil(id_usuario:string){
    const body = {
      id_usuario: id_usuario,
      aksi: "profile-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
    this.dataUser = data.result;
    this.loadingController.dismiss();
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
  async presentLoadingWithOptions(){
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 5000,
      message: 'Cargando datos...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading',
    });
    return await loading.present();
  }
}
