import { LoadingController, ModalController, ToastController, NavController } from '@ionic/angular';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { Tatencion } from './../../../interfaces/atencion';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Municipios } from './../../../interfaces/municipios';
import { Edades } from 'src/app/interfaces/edades';
import { Sexos } from 'src/app/interfaces/sexos';
import SignaturePad from 'signature_pad';
import { Preferences } from '@capacitor/preferences';
import { Especies } from 'src/app/interfaces/especies';
import { Animalsilvestre } from 'src/app/interfaces/animalsilvestre';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-crearar',
  templateUrl: './crearar.page.html',
  styleUrls: ['./crearar.page.scss'],
})
export class CreararPage implements OnInit {
  get num_acta(){
    return this.formulario.get("num_acta");
  }

  get fecha(){
    return this.formulario.get("fecha");
  }

  get hora(){
    return this.formulario.get("hora");
  }

  get tipo_rescate(){
    return this.formulario.get("tipo_rescate");
  }

  get municipio_E(){
    return this.formulario.get("municipio_E");
  }

  get barrio(){
    return this.formulario.get("barrio");
  }

  get calle(){
    return this.formulario.get("calle");
  }

  get nrocasa(){
    return this.formulario.get("nrocasa");
  }

  get municipio_S(){
    return this.formulario.get("municipio_S");
  }

  get barrio_S(){
    return this.formulario.get("barrio_S");
  }

  get calle_S(){
    return this.formulario.get("calle_S");
  }

  get empresa(){
    return this.formulario.get("empresa");
  }

  get area(){
    return this.formulario.get("area");
  }

  get animal_silvestre(){
    return this.formulario.get("animal_silvestre");
  }

  get observaciones(){
    return this.formulario.get("observaciones");
  }

  get cedula(){
    return this.formulario.get("cedula");
  }

  get nombre(){
    return this.formulario.get("nombre");
  }

  get telefono(){
    return this.formulario.get("telefono");
  }
  
  formulario = this.formbuilder.group({
    num_acta: ["",[Validators.required]],
    fecha:["",[Validators.required]],
    hora:["",[Validators.required]],
    tipo_rescate:["",[Validators.required]],
    municipio_E:["",[Validators.required]],
    barrio:["",[Validators.required]],
    calle:["",[Validators.required]],
    nrocasa:["",[Validators.required]],
    municipio_S:["",[Validators.required]],
    barrio_S:["",[Validators.required]],
    calle_S:["",[Validators.required]],
    empresa:["",[Validators.required]],
    area:["",[Validators.required]],
    animal_silvestre:[""],
    observaciones:[""],
    cedula:["",[Validators.required]],
    nombre:["",[Validators.required]],
    telefono:["",[Validators.required]],
  });
  customAlertOptions = {
    header: 'Animal Silvestre',
    subHeader: 'procedente de la atención',
    // message: 'Selecciona el animal silvestre',
    translucent: true,
  };
  animalsilvestre: Animalsilvestre[];
  tatencion: Tatencion[];
  municipios: Municipios[];
  edades: Edades[];
  sexos: Sexos[];
  especies: Especies[];
  dataStorage:any
  dataUser:any = []
  arecepcion ={

    especie_proc:[],

    id_usuario: 0,

    firmaP: ""

  }
  signaturePad: SignaturePad;
  especie_proc = []
  nro = 1
  @ViewChild('canvas') canvasEl : ElementRef;
  touchEvent:string;
  
  constructor(private conexion  : ConexionService,
              private toastCtrl : ToastController,
              public loadingController: LoadingController,
              private formbuilder: FormBuilder,
              private navCtrl: NavController) {}

  ngOnInit() { 
    this.ListAnimals();
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
  closeModal(){
    this.navCtrl.pop()
  }
  AgregarEspeciesProcedentes(){
    this.nro++
    this.especie_proc.push({
      "id_animal_silvestre" : this.formulario.get("animal_silvestre").value,
      "observacion" : this.formulario.get("observaciones").value
    })
    this.formulario.get(["animal_silvestre"]).setValue([""])
    this.formulario.get(["observaciones"]).setValue([""])
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
  ListAnimals(){
    this.conexion.getdata("animals.php/?aksi=list-animals-sinplanilla").subscribe((data:any)=>{
      this.animalsilvestre = data.listAnimalsSinPlanilla
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

  registrarAr(data:any){
    const body ={
      nro_acta: data.num_acta,
      fecha: data.fecha,
      hora: data.hora,
      tipo_rescate: data.tipo_rescate,

      id_municipio_E: data.municipio_E,
      barrio: data.barrio,
      calle: data.calle,
      nro_casa: data.nrocasa,

      id_municipio_S: data.municipio_S,
      barrioS: data.barrio_S,
      calleS: data.calle_S,
      empresa: data.empresa,
      area: data.area,

      especie_proc:this.especie_proc,

      id_usuario: this.arecepcion.id_usuario,

      cedulaP: data.cedula,
      nombreP: data.nombre,
      telefonoP: data.telefono,
      firmaP: this.arecepcion.firmaP,

      aksi:"registrar-ar"
    }
    
    this.presentLoadingWithOptions()
    this.conexion.postdata(body,"arecepcion.php").subscribe((data:any)=>{
      if (data.success) {
        this.closeModal()
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
  public errormensaje = {
    num_acta:[
      {type:"required", message:"Numero de acta requerida"}
    ],
    fecha:[
      {type:"required", message:"Fecha requerida"}
    ],
    hora:[
      {type:"required", message:"Hora requerida"}
    ],
    tipo_rescate:[
      {type:"required", message:"Tipo de rescate requerido"}
    ],
    municipio_E:[
      {type:"required", message:"Municipio requerido"}
    ],
    barrio:[
      {type:"required", message:"Barrio requerido"}
    ],
    calle:[
      {type:"required", message:"Calle requerido"}
    ],
    nrocasa:[
      {type:"required", message:"Nro de casa requerida"}
    ],
    municipio_S:[
      {type:"required", message:"Municipio requerido"}
    ],
    barrio_S:[
      {type:"required", message:"Barrio requerido"}
    ],
    calle_S:[
      {type:"required", message:"Calle requerido"}
    ],
    empresa:[
      {type:"required", message:"Empresa requerida"}
    ],
    area:[
      {type:"required", message:"Area requerida"}
    ],
    cedula:[
      {type:"required", message:"Cedula requerida"}
    ],
    nombre:[
      {type:"required", message:"Nombre requerido"}
    ],
    telefono:[
      {type:"required", message:"Telefono requerido"}
    ],
  }
}
