import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Hclinica } from 'src/app/interfaces/hclinica';

@Component({
  selector: 'app-viewhistoria',
  templateUrl: './viewhistoria.page.html',
  styleUrls: ['./viewhistoria.page.scss'],
})
export class ViewhistoriaPage implements OnInit {
  hclinica: Hclinica[];
  datos:any
  constructor(private modalCtrl: ModalController,
              private conexion: ConexionService,
              private navParam: NavParams) { }

  ngOnInit() {
    this.datos = this.navParam.get("historia");
    this.verHistoria();
  }
  Cerrar(){
    this.modalCtrl.dismiss()
  }
  verHistoria(){
    this.conexion.getdata("hclinica.php/?aksi=list-hclinica").subscribe((data:any)=>{
      this.hclinica = data.listHclinica
    })
  }
}
