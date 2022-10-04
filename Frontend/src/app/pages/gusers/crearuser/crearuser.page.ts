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
      name: "",
      email: "",
      ncargo: "",
      password: "",
      id_cargo: "",
      firma: ""
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
  closeModal(){
    this.modalCtrl.dismiss(null,'close');
  }

  ListCargo(){
    this.conexion.getdata("cargo.php/?aksi=list-cargo").subscribe((data:any)=>{
      this.cargos = data.listCargo
    })
  }

  RegisterUser(){
    this.presentLoadingWithOptions();
    const body = {
      name: this.users.name,
      email: this.users.email,
      password: this.users.password,
      id_cargo: this.users.id_cargo,
      firma: this.users.firma,
      aksi: "register-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
      if (data.success) {
        this.loadingController.dismiss();
        this.closeModal();
        console.log(body)
        this.mensaje(data.msg)
      } else {
        this.loadingController.dismiss();
        this.mensaje(data.msg)
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
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    this.touchEvent = this.signaturePad.toDataURL()
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.users.firma = base64Data;
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
