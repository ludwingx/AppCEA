import { Hclinica } from './../../../interfaces/hclinica';
import { Revext } from './../../../interfaces/revext';
import { ConexionService } from './../../../servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';
import { Especies } from 'src/app/interfaces/especies';
import { Sexos } from 'src/app/interfaces/sexos';
import { Mucosas } from 'src/app/interfaces/mucosas';
import { Preferences } from '@capacitor/preferences';
import { ToastController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Animalsilvestre } from 'src/app/interfaces/animalsilvestre';
import { FormBuilder, Validators } from '@angular/forms';
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
  get fecha_hc(){
    return this.formulario.get("fecha_hc");
  }
  get hora_hc(){
    return this.formulario.get("hora_hc");
  }
  get id_animal_silvestre(){
    return this.formulario.get("id_animal_silvestre");
  }
  get anamnesis_hc(){
    return this.formulario.get("anamnesis_hc");
  }
  get id_mucosa(){
    return this.formulario.get("id_mucosa");
  }
  get observaciones_hc(){
    return this.formulario.get("observaciones_hc");
  }
  get id_revext(){
    return this.formulario.get("id_revext");
  }
  get sis_nervioso_hc(){
    return this.formulario.get("sis_nervioso_hc");
  }
  get sis_respiratorio_hc(){
    return this.formulario.get("sis_respiratorio_hc");
  }
  get temperatura_hc(){
    return this.formulario.get("temperatura_hc");
  }
  get frec_cardiaca_hc(){
    return this.formulario.get("frec_cardiaca_hc");
  }
  get peso_hc(){
    return this.formulario.get("peso_hc");
  }
  get pruebas_complementarias_hc(){
    return this.formulario.get("pruebas_complementarias_hc");
  }
  get hreposicion_hc(){
    return this.formulario.get("hreposicion_hc");
  }
  get diagn_confirmado_hc(){
    return this.formulario.get("diagn_confirmado_hc");
  }
  get hmantenimiento_hc(){
    return this.formulario.get("hmantenimiento_hc");
  }
  get hperdidas_hc(){
    return this.formulario.get("hperdidas_hc");
  }
  get farmaco_td(){
    return this.formulario.get("farmaco_td");
  }
  get accion_td(){
    return this.formulario.get("accion_td");
  }
  get dosis_td(){
    return this.formulario.get("dosis_td");
  }
  get via_td(){
    return this.formulario.get("via_td");
  }
  get hora_td(){
    return this.formulario.get("hora_td");
  }

  
  formulario = this.formbuilder.group({
    fecha_hc: ["",[Validators.required]],
    hora_hc: ["",[Validators.required]],
    id_animal_silvestre: ["",[Validators.required]],
    anamnesis_hc: ["",[Validators.required]],
    id_mucosa: ["",[Validators.required]],
    observaciones_hc: ["",[Validators.required]],
    id_revext: ["",[Validators.required]],
    sis_nervioso_hc: ["",[Validators.required]],
    sis_respiratorio_hc: ["",[Validators.required]],
    temperatura_hc: ["",[Validators.required]],
    frec_cardiaca_hc: ["",[Validators.required]],
    peso_hc: ["",[Validators.required]],
    pruebas_complementarias_hc: ["",[Validators.required]],
    diagn_presuntivo_hc: ["",[Validators.required]],
    diagn_confirmado_hc: ["",[Validators.required]],
    hreposicion_hc: ["",[Validators.required]],
    hmantenimiento_hc: ["",[Validators.required]],
    hperdidas_hc: ["",[Validators.required]],
    farmaco_td:[""],
    accion_td:[""],
    dosis_td:[""],
    via_td:[""],
    hora_td:[""],


  });
  customAlertOptions = {
    header: 'Animales Silvestres',
    subHeader: 'con acta de recepción',
    // message: 'Selecciona el animal silvestre',
    translucent: true,
  };
  hclinica = {

    id_usuario: 0,

    tratamiento_diagnostico: []

  }
  tratamiento_diagnostico = []
  nro = 1
  animalsilvestre: Animalsilvestre[];
  constructor(private conexion : ConexionService,
              private toastCtrl: ToastController,
              private formbuilder: FormBuilder,
              public loadingController: LoadingController,
              private modalCtrl: ModalController,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.ListAnimals();
    this.ListEspecies();
    this.ListSexo();
    this.ListMucosa();
    this.ListRevext();
    Preferences.get({key: "session_user"}).then((data:any)=>{
      this.dataStorage = JSON.parse(data.value);
      this.perfil(this.dataStorage.id_usuario);

    })
  }
  ListAnimals(){
    this.conexion.getdata("animals.php/?aksi=list-animals-conplanilla").subscribe((data:any)=>{
      this.animalsilvestre = data.listAnimalsConPlanilla
    })
  }
  agregarTratamientoDiagnostico(){
    this.nro++
    this.tratamiento_diagnostico.push({
      "farmaco_td" : this.formulario.get("farmaco_td").value,
      "accion_td" : this.formulario.get("accion_td").value,
      "dosis_td" : this.formulario.get("dosis_td").value,
      "via_td" : this.formulario.get("via_td").value,
      "hora_td" : this.formulario.get("hora_td").value
    })
    this.formulario.get(["farmaco_td"]).setValue([""])
    this.formulario.get(["accion_td"]).setValue([""])
    this.formulario.get(["dosis_td"]).setValue([""])
    this.formulario.get(["via_td"]).setValue([""])
    this.formulario.get(["hora_td"]).setValue([""])

  }
  closeModal(){
    this.navCtrl.pop()
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
  registrarHc(data:any){
    const body ={
      fecha_hc: data.fecha_hc,
      hora_hc: data.hora_hc,
      id_animal_silvestre: data.id_animal_silvestre,
      anamnesis_hc: data.anamnesis_hc,
      id_mucosa: data.id_mucosa,
      observaciones_hc: data.observaciones_hc,
      id_revext: data.id_revext,
      sis_nervioso_hc: data.sis_nervioso_hc,
      sis_respiratorio_hc: data.sis_respiratorio_hc,
      temperatura_hc: data.temperatura_hc,
      frec_cardiaca_hc: data.frec_cardiaca_hc,
      peso_hc: data.peso_hc,
      pruebas_complementarias_hc: data.pruebas_complementarias_hc,
      diagn_presuntivo_hc: data.diagn_presuntivo_hc,
      diagn_confirmado_hc: data.diagn_confirmado_hc,

      hreposicion_hc: data.hreposicion_hc,
      hmantenimiento_hc: data.hmantenimiento_hc,
      hperdidas_hc: data.hperdidas_hc,
    
      tratamiento_diagnostico:this.tratamiento_diagnostico,
      id_usuario: this.hclinica.id_usuario,

      aksi: "registrar-hcli"
    }
    
    this.presentLoadingWithOptions()
    this.conexion.postdata(body,"hclinica.php").subscribe((data:any)=>{
      console.log(data)
      if (data.success) {
        this.loadingController.dismiss();
        this.mensaje(data.msg)
        this.closeModal()
      } else {
        console.log(body)
        this.loadingController.dismiss();
        this.mensaje(data.msg)
      }
    })
  }
  public errormensaje = {
    fecha_hc:[
      {type:"required", message:"fecha requerida"}
    ],
    hora_hc:[
      {type:"required", message:"hora requerida"}
    ],
    id_animal_silvestre:[
      {type:"required", message:"animal requerido"}
    ],
    anamnesis_hc:[
      {type:"required", message:"anamnesis requerido"}
    ],
    id_mucosa:[
      {type:"required", message:"mucosa requerido"}
    ],
    observaciones_hc:[
      {type:"required", message:"animal requerido"}
    ],
    id_revext:[
      {type:"required", message:"animal requerido"}
    ],
    sis_nervioso_hc:[
      {type:"required", message:"animal requerido"}
    ],
    sis_respiratorio_hc:[
      {type:"required", message:"animal requerido"}
    ],
    temperatura_hc:[
      {type:"required", message:"animal requerido"}
    ],
    frec_cardiaca_hc:[
      {type:"required", message:"animal requerido"}
    ],
    peso_hc:[
      {type:"required", message:"animal requerido"}
    ],
    pruebas_complementarias_hc:[
      {type:"required", message:"animal requerido"}
    ],
    diagn_presuntivo_hc:[
      {type:"required", message:"animal requerido"}
    ],
    diagn_confirmado_hc:[
      {type:"required", message:"animal requerido"}
    ],
    hreposicion_hc:[
      {type:"required", message:"animal requerido"}
    ],
    hmantenimiento_hc:[
      {type:"required", message:"animal requerido"}
    ],
    hperdidas_hc:[
      {type:"required", message:"animal requerido"}
    ],
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
