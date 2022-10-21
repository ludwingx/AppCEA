import { FirmaPage } from './firma/firma.page';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
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
  arecepcion: any =[
    {
    num_acta_ar: "",
    fecha_ar: "",
    hora_ar: "",
    id_tipo_atencion:"",
    id_ldfe_municipio:"",
    nom_ldfe_barrio_ar:"",
    nom_ldfecalle_ar:"",
    num_ldfe_casa_ar:"",
    id_lpd_municipio:"",
    nom_ldp_barrio_ar:"",
    nom_ldp_calle_ar:"",
    nom_ldp_empresa_ar:"",
    nombre_ldp_area_ar:"",
    nom_funcionario_ar:"",
    firma_funcionario_ar:"",
    ci_funcionario_ar:"",
    nom_persona_ar:"",
    firma_persona_ar:"",
    telf_persona_ar:"",
    ci_persona_ar:"",
    id_procedente_atencion:"",
    numero_rec:"",
    nom_cientifico_rec:"",
    nom_comun_rec:"",
    id_edad:"",
    id_sexo:"",
    observaciones_rec:"",
    nom_edad:"",
    nom_sexo:"",
    nom_mun:"",
    nom_tipo_atencion:"",
  }]

  constructor(private conexion  : ConexionService,
              private modalCtrl: ModalController,
              private toastCtrl : ToastController,
              public loadingController: LoadingController) { 
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



  firmar(){
    this.modalCtrl.create({
      component: FirmaPage
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  updateDate(event){ 
    console.log(event.detail.value); //INTRODUCIR EL VALUE EN UN OBJETO "DATE" Y ENVIARLO
    const date = event.detail.value;
    this.arecepcion.fecha_ar = date;
    console.log(this.arecepcion.fecha_ar)
  }
  updateTime(event){
    console.log(event.detail.value); //INTRODUCIR EL VALUE EN UN OBJETO "DATE" Y ENVIARLO
    const date = event.detail.value;
    this.arecepcion.hora_ar = date;
    console.log(this.arecepcion.hora_ar)
  }
  registrarAr(){
    
    const body ={
      
      // num_acta_ar: this.arecepcion.num_acta_ar,
      // fecha_ar: this.arecepcion.fecha_ar,
      // hora_ar: this.arecepcion.hora_ar,
      // id_tipo_atencion: this.arecepcion.id_tipo_atencion,
      // id_ldfe_municipio: this.arecepcion.id_ldfe_municipio,
      // nom_ldfe_barrio_ar: this.arecepcion.nom_ldfe_barrio_ar,
      // nom_ldfecalle_ar: this.arecepcion.nom_ldfecalle_ar,
      // num_ldfe_casa_ar: this.arecepcion.num_ldfe_casa_ar,
      // id_lpd_municipio: this.arecepcion.id_lpd_municipio,
      // nom_ldp_barrio_ar: this.arecepcion.nom_ldp_barrio_ar,
      // nom_ldp_calle_ar: this.arecepcion.nom_ldp_calle_ar,
      // nom_ldp_empresa_ar: this.arecepcion.nom_ldp_empresa_ar,
      // nombre_ldp_area_ar: this.arecepcion.nombre_ldp_area_ar,
      // nom_funcionario_ar: this.arecepcion.nom_funcionario_ar,
      // firma_funcionario_ar: this.arecepcion.firma_funcionario_ar,
      // ci_funcionario_ar: this.arecepcion.ci_funcionario_ar,
      // nom_persona_ar: this.arecepcion.nom_persona_ar,
      // firma_persona_ar: this.arecepcion.firma_persona_ar,
      // telf_persona_ar: this.arecepcion.telf_persona_ar,
      // ci_persona_ar: this.arecepcion.ci_persona_ar,
      // id_procedente_atencion: this.arecepcion.id_procedente_atencion,
      // numero_rec: this.arecepcion.numero_rec,
      // nom_cientifico_rec: this.arecepcion.nom_cientifico_rec,
      // nom_comun_rec: this.arecepcion.nom_comun_rec,
      // id_edad: this.arecepcion.id_edad,
      // id_sexo: this.arecepcion.id_sexo,
      // observaciones_rec: this.arecepcion.observaciones_rec,
      // nom_edad: this.arecepcion.nom_edad,
      // nom_sexo: this.arecepcion.nom_sexo,
      // nom_mun: this.arecepcion.nom_mun,
      aksi:"registrar-ar"
    }
    this.conexion.postdata(body,"arecepcion.php").subscribe((data:any)=>{
      if (data.success) {
        this.loadingController.dismiss();
        console.log(body)
        this.mensaje(data.msg)
      } else {
        this.loadingController.dismiss();
        this.mensaje(data.msg)
        console.log(body)
      }
    })
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
