import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ConexionService } from '../../../servicios/conexion/conexion.service';
import { Cargos } from '../../../interfaces/cargo';
import SignaturePad from 'signature_pad';
@Component({
  selector: 'app-actualizaruser',
  templateUrl: './actualizaruser.page.html',
  styleUrls: ['./actualizaruser.page.scss'],
})
export class ActualizaruserPage implements OnInit {
  users:any = [
    {
      name: "",
      email: "",
      password:"",
      id_cargo: "",
      ncargo: "",
      firma:""
    }
  ]
  cargos: Cargos[]
  datos:any
  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl : ElementRef;
  touchEvent:string;
  showPassword = false;
  passwordToggleIcon = 'eye';
  constructor(private modalCtrl: ModalController,
              private conexion: ConexionService,
              private toastCtrl: ToastController,
              private navParam: NavParams,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.datos = this.navParam.get("users");
    this.ListCargo();
  }
  ListCargo(){
    this.conexion.getdata("cargo.php/?aksi=list-cargo").subscribe((data:any)=>{
      this.cargos = data.listCargo
    })
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
      id_user: this.users.id_user,
      name: this.users.name,
      email: this.users.email,
      password: this.users.password,
      ncargo: this.users.ncargo,
      id_cargo: this.users.id_cargo,
      firma: this.users.firma,
      aksi: "update-user"
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
      message: 'Actualizando Usuario...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading',
    });
    return await loading.present();
  }
}
