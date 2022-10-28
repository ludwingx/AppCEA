import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { Tatencion } from './../../../interfaces/atencion';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Municipios } from './../../../interfaces/municipios';
import { Edades } from 'src/app/interfaces/edades';
import { Sexos } from 'src/app/interfaces/sexos';
import SignaturePad from 'signature_pad';
import { Preferences } from '@capacitor/preferences';
import { VerActaPage } from '../../../modales/ver-acta/ver-acta.page';
import { Especies } from 'src/app/interfaces/especies';
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
  especies: Especies[];
  dataStorage:any
  dataUser:any = []
  arecepcion ={
    nro_acta: "",
    fecha: "",
    hora:"",
    tipo_rescate: 0,

    id_municipio_E: 0,
    barrio: "",
    calle: "",
    nro_casa: "",

    id_municipio_S: 0,
    barrioS: "",
    calleS: "",
    empresa: "",
    area: "",

    especie_proc:[],

    id_usuario: 0,

    cedulaP: "",
    nombreP: "",
    telefonoP: "",
    firmaP: ""

  }
  signaturePad: SignaturePad;
  especie_proc = []
  nro = 1
  especieData = {
    especies:0,
    nombreCi : "",
    nombreCom : "",
    edad : 0,
    sexo : 0,
    observacion: ""
  }
  @ViewChild('canvas') canvasEl : ElementRef;
  touchEvent:string;
  constructor(private conexion  : ConexionService,
              private toastCtrl : ToastController,
              public loadingController: LoadingController) {}

  ngOnInit() { 
    this.ListEdades();
    this.ListSexos();
    this.ListAtencion();
    this.ListMunicipios();
    this.ListEspecies();
    Preferences.get({key: "session_user"}).then((data:any)=>{
      this.dataStorage = JSON.parse(data.value);
      this.perfil(this.dataStorage.id_usuario);

    })
  }

  AgregarEspeciesProcedentes(){
    this.nro++
    this.especie_proc.push({
      "especies"      : this.especieData.especies,
      "nombreCi"  :this.especieData.nombreCi,
      "nombreCom" : this.especieData.nombreCom,
      "edad"      : this.especieData.edad,
      "sexo"      : this.especieData.sexo,
      "observacion" : this.especieData.observacion
    })
    this.especieData = {
      especies: 0,
      nombreCi : "",
      nombreCom : "",
      edad : 0,
      sexo : 0,
      observacion: ""
    }
  }

  perfil(id_usuario:number){
    this.arecepcion.id_usuario = id_usuario
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
  ListEspecies(){
    this.conexion.getdata("especie.php/?aksi=list-especie").subscribe((data:any)=>{
      this.especies = data.listEspecies
    })
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }

  registrarAr(){
    const body ={
      nro_acta: this.arecepcion.nro_acta,
      fecha: this.arecepcion.fecha,
      hora: this.arecepcion.hora,
      tipo_rescate: this.arecepcion.tipo_rescate,

      id_municipio_E: this.arecepcion.id_municipio_E,
      barrio: this.arecepcion.barrio,
      calle: this.arecepcion.calle,
      nro_casa: this.arecepcion.nro_casa,

      id_municipio_S: this.arecepcion.id_municipio_S,
      barrioS: this.arecepcion.barrioS,
      calleS: this.arecepcion.calleS,
      empresa: this.arecepcion.empresa,
      area: this.arecepcion.area,

      especie_proc:this.especie_proc,

      id_usuario: this.arecepcion.id_usuario,

      cedulaP: this.arecepcion.cedulaP,
      nombreP: this.arecepcion.nombreP,
      telefonoP: this.arecepcion.telefonoP,
      firmaP: this.arecepcion.firmaP,

      aksi:"registrar-ar"
    }
    this.presentLoadingWithOptions()
    this.conexion.postdata(body,"arecepcion.php").subscribe((data:any)=>{
      console.log(data)
      if (data.success) {
        this.loadingController.dismiss();
        this.mensaje(data.msg)
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
      message: 'Registrando Acta...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading',
    });
    return await loading.present();
  }
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    this.touchEvent = this.signaturePad.toDataURL()
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
    this.arecepcion.firmaP = base64Data;
  }
}
