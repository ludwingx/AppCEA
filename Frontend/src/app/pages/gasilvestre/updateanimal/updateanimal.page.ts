import { ConexionService } from './../../../servicios/conexion/conexion.service';
import { NavParams, ToastController, ModalController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Edades } from 'src/app/interfaces/edades';
import { Especies } from 'src/app/interfaces/especies';
import { Sexos } from 'src/app/interfaces/sexos';

@Component({
  selector: 'app-updateanimal',
  templateUrl: './updateanimal.page.html',
  styleUrls: ['./updateanimal.page.scss'],
})
export class UpdateanimalPage implements OnInit {
  edades: Edades[];
  sexos: Sexos[];
  especies: Especies[];
  animalsilvestre:any =[
    {
      id_especies:"",
      nom_especies:"",
      nom_cientifico:"",
      nom_comun:"",
      id_edad:"",
      nom_edad:"",
      id_sexo:"",
      nom_sexo:""
    }
  ]
  datos:any
  constructor(private navParam: NavParams,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private conexion: ConexionService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.datos = this.navParam.get("animalsilvestre");
    this.ListEdades();
    this.ListSexos();
    this.ListEspecies();
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

  closeModal(){
    this.modalCtrl.dismiss(null,'close');
  }
  updateAnimal(){
    this.presentLoadingWithOptions();
    const body = {
      id_animal_silvestre: this.animalsilvestre.id_animal_silvestre,
      id_especies: this.animalsilvestre.id_especies,
      nom_especies: this.animalsilvestre.nom_especies,
      nom_cientifico: this.animalsilvestre.nom_cientifico,
      nom_comun: this.animalsilvestre.nom_comun,
      id_edad: this.animalsilvestre.id_edad,
      nom_edad: this.animalsilvestre.nom_edad,
      id_sexo: this.animalsilvestre.id_sexo,
      nom_sexo: this.animalsilvestre.nom_sexo,
      aksi: "update-as"
  }
    this.conexion.postdata(body,"animals.php").subscribe((data:any)=>{
      if (data.success) {
        this.loadingController.dismiss();
        console.log(body)
        this.mensaje(data.msg)
        this.closeModal()
        
      } else {
        this.loadingController.dismiss();
        this.mensaje(data.msg)
        console.log(body);
      }
    })
  }
  async presentLoadingWithOptions(){
    const loading = await this.loadingController.create({
      //spinner: null,
      duration: 3000,
      message: 'Actualizando datos del Animal silvestre...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading',
    });
    return await loading.present();
  }
}

