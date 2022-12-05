import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Hclinica } from 'src/app/interfaces/hclinica';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';

@Component({
  selector: 'app-listdelhc',
  templateUrl: './listdelhc.page.html',
  styleUrls: ['./listdelhc.page.scss'],
})
export class ListdelhcPage implements OnInit {
  hclinica : Hclinica [];
  constructor(private conexion: ConexionService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController) { }

    ngOnInit() {
      this.ListDisHc()
      }
      async mensaje (m: string){
        const t = await this.toastCtrl.create({
          message: m,
          duration: 3000
        })
        t.present();
      }
      ListDisHc(){
        this.conexion.getdata("hclinica.php/?aksi=list-eliminate").subscribe((data:any)=>{
          this.hclinica = data.listDisHc
        })
      }
      closeModal(){
        this.modalCtrl.dismiss(null,'close');
      }
      habilitarHc(id_historia_clinica:string, nom_comun:string){
        this.alertCtrl.create({
          header: 'Habilitar',
          message: '¿Estás seguro de que quieres habilitar la Historia Clínica de ' + nom_comun + ' #' + id_historia_clinica + '?',
          buttons: [{
            text: 'Si',
            handler: () => {
              const body = {
                id_historia_clinica: id_historia_clinica,
                aksi: "habilitar-hc"
              }
              this.conexion.postdata(body,"hclinica.php").subscribe((data:any)=>{
                if (data.success) {
                  this.mensaje(data.msg)
                } else {
                  this.mensaje(data.msg)
                }this.ListDisHc()
              })
            }
          },
          {text: 'No'}
        ]
        })
        .then(alertEl => alertEl.present());
      }
}
