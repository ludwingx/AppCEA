import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Animalsilvestre } from 'src/app/interfaces/animalsilvestre';
import { Edades } from 'src/app/interfaces/edades';
import { Especies } from 'src/app/interfaces/especies';
import { Sexos } from 'src/app/interfaces/sexos';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';

@Component({
  selector: 'app-crearas',
  templateUrl: './crearas.page.html',
  styleUrls: ['./crearas.page.scss'],
})
export class CrearasPage implements OnInit {
  edades: Edades[];
  sexos: Sexos[];
  especies: Especies[];
  animalsilvestre : Animalsilvestre[];
  animalSilvestre: any = [
    {
      id_especies:0,
      nom_cientifico:"", 
      nom_comun:"",
      id_edad:0,
      id_sexo:0,
    }
  ]
  constructor(private conexion  : ConexionService,
              private modalCtrl : ModalController,
              private toastCtrl : ToastController,
              public loadingController: LoadingController) { }

  ngOnInit() {
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
  closeModal(){
    this.modalCtrl.dismiss(null,'close');
  }
  registrarAs(){
    this.presentLoadingWithOptions();
    const body = {
      id_especies: this.animalSilvestre.id_especies,
      nom_cientifico: this.animalSilvestre.nom_cientifico,
      nom_comun: this.animalSilvestre.nom_comun,
      id_edad: this.animalSilvestre.id_edad,
      id_sexo: this.animalSilvestre.id_sexo,
      aksi: "registrar-as"
    }
    
    this.conexion.postdata(body,"animals.php").subscribe((data:any)=>{
      if (data.success) {
        this.loadingController.dismiss();
        this.mensaje(data.msg)
        this.closeModal()
      } else {
        this.loadingController.dismiss();
        this.mensaje(data.msg)
      }
    })
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  async presentLoadingWithOptions(){
    const loading = await this.loadingController.create({
      //spinner: null,
      duration: 2000,
      message: 'Registrando Animal Silvestre...',
      //translucent: true,
      //cssClass: 'custom-class custom-loading'
      cssClass: 'custom-loading',
    });
    return await loading.present();
  }
}
