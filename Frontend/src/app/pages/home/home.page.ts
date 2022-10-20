import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from "@capacitor/storage";
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dataStorage:any
  dataUser:any = []
  photoCharge=false;

  constructor(private toastCtrl: ToastController,
              private conexion: ConexionService,
              private navCtrl: NavController) { }

  ngOnInit() {

    Storage.get({key: "session_user"}).then((data:any)=>{
      
      this.dataStorage = JSON.parse(data.value);
      this.perfil(this.dataStorage.id_usuario);

    })
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
    Storage.remove({key:"session_user"})
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
}
