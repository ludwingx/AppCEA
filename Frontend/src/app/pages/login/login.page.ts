import { ConexionService } from './../../servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController, AlertController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  get email_u(){
    return this.formLogin.get("email_u");
  }
  get password_u(){
    return this.formLogin.get("password_u");
  }
  formLogin = this.formbuilder.group({
    email_u: ["",[Validators.required]],
    password_u: ["",[Validators.required]],
  });
  tipo: string = "password";
  showPassword = false;
  passwordToggleIcon = 'eye';
  constructor(private toastCtrl: ToastController,
     private navCtrl: NavController, 
     private conexion: ConexionService,
     private formbuilder: FormBuilder,
     public loadingController: LoadingController,
     private alertCtrl: AlertController
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
  login(data:any){
    this.presentLoadingWithOptions();
    const body = {
      email_u: data.email_u,
      password_u: data.password_u,
      aksi: "login"
    }

    this.conexion.postdata(body,"usuario.php").subscribe((data:any) => {
      const alerta = data.msg;
      if (data.success){
        Preferences.set({key:"session_user",value:JSON.stringify(data.result)})
        this.loadingController.dismiss();
        this.navCtrl.navigateRoot(["/home"]);
        this.mensaje("Inicio de sesión correcto!");
      }
      else{
        this.loadingController.dismiss();
        this.datosIncorrectos();

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
      duration: 5000,
      message: 'Iniciando sesión...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading'
    });
    return await loading.present();
  }
  public errormensaje = {
    email_u:[
      {type:"required", message:"Correo Electrónico requerido"}
    ],
    password_u:[
      {type:"required", message:"Contraseña requerida"}
    ],
  }
  async datosIncorrectos() {
    const alert = await this.alertCtrl.create({
      header: 'Error al iniciar sesión',
      subHeader: 'Correo electrónico o contraseña incorrecta',
      message: 'Por favor, inténtalo otra vez',
      buttons: ['OK'],
    });

    await alert.present();
  }
}