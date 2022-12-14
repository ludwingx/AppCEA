import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  dataUser:any = [
    {
      nombre_u: "",
      email_u: "",
      password_u:"",
      ci_u:"",
      foto_u:""
    }
  ]
  datos:any
  showPassword = false;
  passwordToggleIcon = 'eye';
  constructor(private modalCtrl: ModalController,
    private conexion: ConexionService,
    private toastCtrl: ToastController,
    private navParam: NavParams,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.datos = this.navParam.get("users");
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present(); 
  }

  closeModal(){
    this.modalCtrl.dismiss(null,'close');
  }
  togglePassword():void{
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off'
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }
  UpdateUser(){
    this.presentLoadingWithOptions();
    const body = {
      id_usuario: this.dataUser.id_usuario,
      nombre_u: this.dataUser.nombre_u,
      email_u: this.dataUser.email_u,
      password_u: this.dataUser.password_u,
      ci_u: this.dataUser.ci_u,
      foto_u: this.dataUser.foto_u,
      aksi: "updatePhoto"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{        console.log(body)
      if (data.success) {
        this.loadingController.dismiss();
        console.log(body)
        this.mensaje(data.msg)
        this.closeModal()
      } else {
        this.loadingController.dismiss();
        this.mensaje(data.msg)
      }
    })
  }
  async presentLoadingWithOptions(){
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 5000,
      message: 'Actualizando Usuario...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading',
    });
    return await loading.present();
  }
  selectImageOptions(){
    var options:ImageOptions={
      source:CameraSource.Photos,
      resultType:CameraResultType.DataUrl
    }
    Camera.getPhoto(options).then((result)=>{
      this.dataUser.foto_u = result.dataUrl;

    },(err)=>{
      alert(err);
    })
  }
}
