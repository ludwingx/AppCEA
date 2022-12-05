import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Arecepcion } from 'src/app/interfaces/arecepcion';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';

@Component({
  selector: 'app-listdelar',
  templateUrl: './listdelar.page.html',
  styleUrls: ['./listdelar.page.scss'],
})
export class ListdelarPage implements OnInit {
  arecepcion : Arecepcion [];
  constructor(private conexion: ConexionService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController) { }

    ngOnInit() {
      this.ListDisAr()
      }
      async mensaje (m: string){
        const t = await this.toastCtrl.create({
          message: m,
          duration: 3000
        })
        t.present();
      }
      ListDisAr(){
        this.conexion.getdata("arecepcion.php/?aksi=list-eliminate").subscribe((data:any)=>{
          this.arecepcion = data.listDisAr
        })
      }
      closeModal(){
        this.modalCtrl.dismiss(null,'close');
      }
      enableActa(id_acta_recepcion:string, num_acta_ar:string){
        this.alertCtrl.create({
          header: 'Habilitar',
          message: '¿Estás seguro de que quieres habilitar ' + num_acta_ar + ' #' + id_acta_recepcion + '?',
          buttons: [{
            text: 'Si',
            handler: () => {
              const body = {
                id_acta_recepcion: id_acta_recepcion,
                aksi: "habilitar-ar"
              }
              this.conexion.postdata(body,"arecepcion.php").subscribe((data:any)=>{
                if (data.success) {
                  this.mensaje(data.msg)
                } else {
                  this.mensaje(data.msg)
                }this.ListDisAr()
              })
            }
          },
          {text: 'No'}
        ]
        })
        .then(alertEl => alertEl.present());
      }

}
