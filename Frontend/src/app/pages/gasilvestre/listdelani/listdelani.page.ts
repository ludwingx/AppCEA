import { Animalsilvestre } from 'src/app/interfaces/animalsilvestre';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';

@Component({
  selector: 'app-listdelani',
  templateUrl: './listdelani.page.html',
  styleUrls: ['./listdelani.page.scss'],
})
export class ListdelaniPage implements OnInit {

  animalsilvestre: Animalsilvestre[];
  constructor(private conexion: ConexionService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  this.ListDisAnimals()
  }
  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  ListDisAnimals(){
    this.conexion.getdata("animals.php/?aksi=list-eliminate").subscribe((data:any)=>{
      this.animalsilvestre = data.listDisAnimals
    })
  }
  closeModal(){
    this.modalCtrl.dismiss(null,'close');
  }
  enableAnimal(id_animal_silvestre:string, nom_comun:string){
    this.alertCtrl.create({
      header: 'Habilitar',
      message: '¿Estás seguro de que quieres habilitar al animal silvestre  ' + nom_comun + '#'+ id_animal_silvestre + '?',
      buttons: [{
        text: 'Si',
        handler: () => {
          const body = {
            id_animal_silvestre: id_animal_silvestre,
            aksi: "incluir-as"
            
          }
          this.conexion.postdata(body,"animals.php").subscribe((data:any)=>{
            if (data.success) {
              this.mensaje(data.msg)
            } else {
              this.mensaje(data.msg)
            }this.ListDisAnimals()
          })
        }
      },
      {text: 'No'}
    ]
    })
    .then(alertEl => alertEl.present());
  }
}