import { ConexionService } from './../../../servicios/conexion/conexion.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { File, IWriteOptions  } from '@awesome-cordova-plugins/file/ngx';
import { formatDate } from '@angular/common';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
@Component({
  selector: 'app-viewacta',
  templateUrl: './viewacta.page.html',
  styleUrls: ['./viewacta.page.scss'],
})
export class ViewactaPage implements OnInit {
  dataActa:any = []
  procedente:any = []
  datos:any
  factual = formatDate(Date.now(),'yyyy-MM-dd','en-US')
  constructor(private modalCtrl: ModalController,
              private navParam: NavParams,
              private conexion: ConexionService,
              private platform: Platform,
              private toastCtrl: ToastController,
              private file: File) { }

  ngOnInit() {
    this.datos = this.navParam.get("arecepcion");
  }
  Cerrar(){
    this.modalCtrl.dismiss()
  }
  generarPdf(){
    const pdfBlock = document.getElementById("print-pdf");
    const options = { 
      background: "white",
      height: 600, 
      width: 1024 
    };

    domtoimage.toPng(pdfBlock!, options).then((fileUrl) => {
      var doc = new JSPDF("p","mm","a4");
      doc.addImage(fileUrl, 'PNG', 10, 10, 0, 0);
  
      let docRes = doc.output();
      let blob = new ArrayBuffer(docRes.length);
      let array = new Uint8Array(blob);
      for (var i = 0; i < docRes.length; i++) {
          array[i] = docRes.charCodeAt(i);
      }
  
  
      let nombrePDF = "reporte-" + this.factual + ".pdf"
      let path = "file:///storage/emulated/0/"
      let options: IWriteOptions = { 
        replace: true 
      };
  
      doc.save("esto.pdf");
    }).catch(function (error) {
      console.error(error);
    });
  }

  async presentToast(m:string) {
    const toast = await this.toastCtrl.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }
}
