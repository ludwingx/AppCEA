import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Animalsilvestre } from 'src/app/interfaces/animalsilvestre';
import { Hclinica } from 'src/app/interfaces/hclinica';

import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { ViewhistoriaPage } from './viewhistoria/viewhistoria.page';

@Component({
  selector: 'app-ghclinica',
  templateUrl: './ghclinica.page.html',
  styleUrls: ['./ghclinica.page.scss'],
})
export class GhclinicaPage implements OnInit {
  hclinica: Hclinica[];

  constructor(private conexion: ConexionService,
              private modalCtrl: ModalController) { }

  ngOnInit(){
    this.ListHistoria();
  }

  ListHistoria(){
    this.conexion.getdata("hclinica.php/?aksi=list-hclinica").subscribe((data:any)=>{
      this.hclinica = data.listHclinica
    })
  }
  verHistoria(historia:any){
    this.modalCtrl.create({
      component: ViewhistoriaPage,
      componentProps: { historia }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
}