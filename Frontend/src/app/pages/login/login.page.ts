import { ConexionService } from './../../servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Storage } from "@capacitor/storage";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  tipo: string = "password";
  email: string;
  password: string; 
  showPassword = false;
  passwordToggleIcon = 'eye';
  constructor(private toastCtrl: ToastController,
     private navCtrl: NavController, 
     private conexion: ConexionService,
     public loadingController: LoadingController
    ) {}
  ngOnInit() {
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  mostrar(valor: string){
    if(valor == "1"){
      this.tipo = "text"
    }
    else{
      this.tipo = "password"
    }
  }
  login(){
    this.presentLoadingWithOptions();
    const body = {
      email: this.email,
      password: this.password,
      aksi: "login"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any) => {
      const alerta = data.msg;
      if (data.success){
        Storage.set({key:"session_user",value:JSON.stringify(data.result)})
        this.loadingController.dismiss();
        this.navCtrl.navigateRoot(["/home"]);
        this.mensaje("Inicio de sesión correcto!");
      }
      else{
        this.loadingController.dismiss();
        this.mensaje(alerta);
      }
    })
  }
  togglePassword():void{
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off'
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }
  async presentLoadingWithOptions(){
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 5000,
      message: 'Iniciando sesión...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading'
    });
    return await loading.present();
  }
}