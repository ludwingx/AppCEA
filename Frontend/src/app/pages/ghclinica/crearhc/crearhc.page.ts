import { Hclinica } from './../../../interfaces/hclinica';
import { Revext } from './../../../interfaces/revext';
import { ConexionService } from './../../../servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Especies } from 'src/app/interfaces/especies';
import { Sexos } from 'src/app/interfaces/sexos';
import { Mucosas } from 'src/app/interfaces/mucosas';
import { Preferences } from '@capacitor/preferences';
import { ToastController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-crearhc',
  templateUrl: './crearhc.page.html',
  styleUrls: ['./crearhc.page.scss'],
})
export class CrearhcPage implements OnInit {
  especies: Especies[];
  sexos: Sexos[];
  mucosas: Mucosas[];
  revext: Revext[];
  dataStorage:any
  dataUser:any = []
  hclinica = {
    fecha_hc: "",
    hora_hc:"",
    id_especies: 0,
    nom_comun_hc: "",
    id_sexo: 0,
    id_edad: 0,

    anamnesis_hc: "",
    id_mucosas: 0,
    observaciones_hc: "",
    id_revext: 0,
    sis_nervioso_hc:"",
    sis_respiratorio_hc:"",
    temperatura_hc:"",
    frec_cardiaca_hc: "",
    peso_hc: "",

    pruebas_complementarias_hc: "",
    diagn_presuntivo_hc: "",
    diagn_confirmado_hc: "",

    hreposicion_hc: "",
    hmantenimiento_hc: "",
    hperdidas_hc: "",

    id_usuario: 0,

    tratamiento_diagnostico: []

  }
  tratamiento_diagnostico = []
  fila=1
  tratdiagnData = {
    farmaco_td:"",
    accion_td: "",
    dosis_td:"",
    via_td:"",
    hora_td:"",
  }
  constructor(private conexion : ConexionService,
              private toastCtrl: ToastController,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.ListEspecies();
    this.ListSexo();
    this.ListMucosa();
    Preferences.get({key: "session_user"}).then((data:any)=>{
      this.dataStorage = JSON.parse(data.value);
      this.perfil(this.dataStorage.id_usuario);

    })
  }
  agregarTratamientoDiagnostico(){
    this.fila++
    this.tratamiento_diagnostico.push({
      "farmaco_td": this.tratdiagnData.farmaco_td,
      "accion_td": this.tratdiagnData.accion_td,
      "dosis": this.tratdiagnData.dosis_td,
      "via_td":this.tratdiagnData.via_td,
      "hora_td": this.tratdiagnData.hora_td
    })
    this.tratdiagnData ={
      farmaco_td:"",
      accion_td: "",
      dosis_td:"",
      via_td:"",
      hora_td:"",
    }
  }
  ListEspecies(){
    this.conexion.getdata("especie.php/?aksi=list-especie").subscribe((data:any)=>{
      this.especies = data.listEspecies
    })
  }
  ListSexo(){
    this.conexion.getdata("sexo.php/?aksi=list-sexo").subscribe((data:any)=>{
      this.sexos = data.listSexos
    })
  }
  ListMucosa(){
    this.conexion.getdata("mucosa.php/?aksi=list-mucosa").subscribe((data:any)=>{
      this.mucosas = data.listMucosas
    })
  }
  ListRevext(){
    this.conexion.getdata("revext.php/?aksi=list-revext").subscribe((data:any)=>{
      this.revext = data.listRevext
    })
  }
  perfil(id_usuario:number){
    this.hclinica.id_usuario = id_usuario
    const body = {
      id_usuario: id_usuario,
      aksi: "profile-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
    this.dataUser = data.result;
    })
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  registrarHc(){
    const body={
      fecha_hc: this.hclinica.fecha_hc,
      hora_hc: this.hclinica.hora_hc,
      id_especies: this.hclinica.id_especies,
      nom_comun_hc: this.hclinica.nom_comun_hc,
      id_sexo: this.hclinica.id_sexo,
      id_edad: this.hclinica.id_edad,
  
      anamnesis_hc: this.hclinica.anamnesis_hc,
      id_mucosas: this.hclinica.id_mucosas,
      observaciones_hc: this.hclinica.observaciones_hc,
      id_revext: this.hclinica.id_revext,
      sis_nervioso_hc: this.hclinica.sis_nervioso_hc,
      sis_respiratorio_hc: this.hclinica.sis_respiratorio_hc,
      temperatura_hc: this.hclinica.temperatura_hc,
      frec_cardiaca_hc: this.hclinica.frec_cardiaca_hc,
      peso_hc: this.hclinica.peso_hc,
  
      pruebas_complementarias_hc: this.hclinica.pruebas_complementarias_hc,
      diagn_presuntivo_hc: this.hclinica.diagn_presuntivo_hc,
      diagn_confirmado_hc: this.hclinica.diagn_confirmado_hc,
  
      hreposicion_hc: this.hclinica.hreposicion_hc,
      hmantenimiento_hc: this.hclinica.hmantenimiento_hc,
      hperdidas_hc: this.hclinica.hperdidas_hc,
  
      id_usuario: this.hclinica.id_usuario,

      aksi: "registrar-hc"
    }
    this.presentLoadingWithOptions()
    this.conexion.postdata(body,"hclinica.php").subscribe((data:any)=>{
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
}
