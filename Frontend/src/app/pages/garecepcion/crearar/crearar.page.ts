import { FirmaPage } from './firma/firma.page';
import { ModalController } from '@ionic/angular';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { Tatencion } from './../../../interfaces/atencion';
import { Component, OnInit } from '@angular/core';
import { Municipios } from './../../../interfaces/municipios';
import { Edades } from 'src/app/interfaces/edades';
import { Sexos } from 'src/app/interfaces/sexos';
import { Storage } from "@capacitor/storage";
@Component({
  selector: 'app-crearar',
  templateUrl: './crearar.page.html',
  styleUrls: ['./crearar.page.scss'],
})
export class CreararPage implements OnInit {
  tatencion: Tatencion[];
  municipios: Municipios[];
  edades: Edades[];
  sexos: Sexos[];
  dataStorage:any
  dataUser:any = []
  constructor(private conexion  : ConexionService, private modalCtrl: ModalController) { 
  }

  ngOnInit() { 
    this.ListEdades();
    this.ListSexos();
    this.ListAtencion();
    this.ListMunicipios();
    Storage.get({key: "session_user"}).then((data:any)=>{
      
      this.dataStorage = JSON.parse(data.value);
      this.perfil(this.dataStorage.id_usuario);

    })
  }
  perfil(id_usuario:string){
    const body = {
      id_usuario: id_usuario,
      aksi: "profile-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
    this.dataUser = data.result;
    })
  }

  ListAtencion(){
    this.conexion.getdata("atencion.php/?aksi=list-tatencion").subscribe((data:any)=>{
      this.tatencion = data.listTatencion
    })
  }
  ListMunicipios(){
    this.conexion.getdata("municipio.php/?aksi=list-municipio").subscribe((data:any)=>{
      this.municipios = data.listMunicipios
    })
  }
  ListEdades(){
    this.conexion.getdata("edad.php/?aksi=list-edad").subscribe((data:any)=>{
      this.edades = data.listEdades
    })
  }
  ListSexos(){
    this.conexion.getdata("sexo.php/?aksi=list-sexo").subscribe((data:any)=>{
      this.sexos = data.listSexos
    })
  }

  change(event){
    console.log(event.detail.value); //INTRODUCIR EL VALUE EN UN OBJETO "DATE" Y ENVIARLO
  }
  firmar(){
    this.modalCtrl.create({
      component: FirmaPage
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  registrarAr(){
    const body ={
      
    }
  }
}
