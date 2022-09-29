import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ConexionService } from '../../../servicios/conexion/conexion.service';
import { Cargos } from '../../../interfaces/cargo';
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
      ncargo: ""
    }
  ]
  cargos: Cargos[]
  datos:any
  constructor(private modalCtrl: ModalController,
              private conexion: ConexionService,
              private toastCtrl: ToastController,
              private navParam: NavParams) { }

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

  UpdateUser(){
    const body = {
      id_user: this.users.id_user,
      name: this.users.name,
      email: this.users.email,
      password: this.users.password,
      ncargo: this.users.ncargo,
      id_cargo: this.users.id_cargo,
      aksi: "update-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
      if (data.success) {
        this.mensaje(data.msg)
        this.closeModal()
      } else {
        this.mensaje(data.msg)
      }
    })
  }

}
