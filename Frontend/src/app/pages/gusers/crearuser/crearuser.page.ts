import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from '../../../servicios/conexion/conexion.service';
import { Cargos } from '../../../interfaces/cargo';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-crearuser',
  templateUrl: './crearuser.page.html',
  styleUrls: ['./crearuser.page.scss'],
})

export class CrearuserPage implements AfterViewInit {
  users:any = [
    {
      nombre_u: "",
      email_u: "",
      nom_cargo: "",
      password_u: "",
      ci_u:"",
      id_cargo: "",
      firma_u: ""
    }
  ]
  cargos: Cargos[]
  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl : ElementRef;
  touchEvent:string;
  showPassword = false;
  passwordToggleIcon = 'eye';
  constructor(private conexion  : ConexionService,
              private modalCtrl : ModalController,
              private toastCtrl : ToastController,
              public loadingController: LoadingController) { 
  }
  ngOnInit() { 
    this.ListCargo()
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  ListCargo(){
    this.conexion.getdata("cargo.php/?aksi=list-cargo").subscribe((data:any)=>{
      this.cargos = data.listCargo
    })
  }
  RegisterUser(){
    this.presentLoadingWithOptions();
    const body = {
      nombre_u: this.users.nombre_u,
      email_u: this.users.email_u,
      password_u: this.users.password_u,
      ci_u: this.users.ci_u,
      id_cargo: this.users.id_cargo,
      firma_u: this.users.firma_u,
      aksi: "register-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
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
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }
  startDrawing(event: Event) {
    this.touchEvent = this.signaturePad.toDataURL()
    console.log(event);
  }
  moved(event: Event) {
  //funciona en el dispositivo no en el navegador
  }
  clearPad() {
    this.signaturePad.clear();
  }
  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.users.firma_u = base64Data;
  }
  async presentLoadingWithOptions(){
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 5000,
      message: 'Registrando Usuario...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading',
    });
    return await loading.present();
  }
}
