import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { File, IWriteOptions  } from '@awesome-cordova-plugins/file/ngx';
import { formatDate } from '@angular/common';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  factual = formatDate(Date.now(),'yyyy-MM-dd','en-US')
  constructor(private platform: Platform,
              private toastCtrl: ToastController,
              private file: File) {}

  pdfContent(){
    const pdfBlock = document.getElementById("print-wrapper");
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
