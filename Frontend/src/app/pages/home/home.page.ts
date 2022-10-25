import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, ModalController, LoadingController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dataStorage:any
  dataUser:any = [
    {
      nombre_u: "",
      email_u: "",
      password_u:"",
      ci_u:"",
      foto_u:""
    }
  ]
  photoCharge=false;

  constructor(private toastCtrl: ToastController,
              private conexion: ConexionService,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private loadingController: LoadingController) { }

  ngOnInit() {
    Preferences.get({key: "session_user"}).then((data:any)=>{
      
      this.dataStorage = JSON.parse(data.value);
      this.perfil(this.dataStorage.id_usuario);

    })

  }
  doRefresh(event){
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 1000);

  }
  openProfile(dataUser:any){
    this.modalCtrl.create({
      component: ProfilePage,
      componentProps: { dataUser }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  closeModal(){
    this.modalCtrl.dismiss(null,'close');

  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  darkTheme(){
    document.body.classList.toggle('dark');
  }
  cerrarSession(){
    Preferences.remove({key:"session_user"})
    this.mensaje("Sessión Cerrada")
    this.navCtrl.navigateRoot(['/login'])

  }
  perfil(id_usuario:string){
    const body = {
      id_usuario: id_usuario,
      aksi: "profile-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
    this.dataUser = data.result;
    this.photoUser();

    })
  }
  async photoUser(){
    if(this.photoCharge == true){
      this.photoCharge = false;
    }else{
      this.photoCharge = true;
    }
  }
  async presentLoadingWithOptions(){
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 5000,
      message: 'Cargando datos del usuario...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading',
    });
    return await loading.present();
  }
}
