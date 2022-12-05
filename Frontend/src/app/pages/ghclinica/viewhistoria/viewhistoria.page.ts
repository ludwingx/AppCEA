import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { ModalController, NavParams, Platform, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Hclinica } from 'src/app/interfaces/hclinica';
import { File, IWriteOptions  } from '@awesome-cordova-plugins/file/ngx';
import { DOCUMENT, formatDate } from '@angular/common';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-viewhistoria',
  templateUrl: './viewhistoria.page.html',
  styleUrls: ['./viewhistoria.page.scss'],
})
export class ViewhistoriaPage implements OnInit {
  hclinica: Hclinica[];
  datos:any
  constructor(private modalCtrl: ModalController,
              private conexion: ConexionService,
              private navParam: NavParams,
              private platform: Platform,
              private toastCtrl: ToastController,
              private file: File) { }

  ngOnInit() {
    this.datos = this.navParam.get("historia");
    this.verHistoria();
  }
  Cerrar(){
    this.modalCtrl.dismiss()
  }
  verHistoria(){
    this.conexion.getdata("hclinica.php/?aksi=list-hclinica").subscribe((data:any)=>{
      this.hclinica = data.listHclinica
    })
  }
  generarPdf(){
    var doc = new JSPDF("p","mm","a4");
    doc.addImage("assets/logoGAD.png","PNG",145,10,50,25)
    doc.line(130,26,80,26)
    doc.setFontSize(15)
    doc.setFont("bold")
    doc.text("HISTORIA CLÍNICA", doc.internal.pageSize.getWidth()/2,25, {align:"center"})
    doc.setFont("regular")
    doc.setFontSize(10)
    doc.text("FECHA: "+ this.datos.fecha_hc,10,27)
    doc.text("HORA: " + this.datos.hora_hc,45,27)
    doc.text("Centro de Atención y Derivación",10,30)
    doc.text("SDMA - DIRENA",10,33)
    doc.setFontSize(8)
    doc.text("Prog. Conservación de la Biodiversidad del Dpto. SC",10,36)
    doc.setFontSize(12)
    doc.setFont("bold")
    doc.text("ESPECIE:" + this.datos.id_especies,10,45)
    doc.text("NOMBRE COMÚN:" + this.datos.nom_comun,60,45)
    doc.text("SEXO:" + this.datos.id_sexo,130,45)
    doc.text("EDAD:" + this.datos.id_edad,170,45)
    doc.text("ANAMNESIS: " + this.datos.anamnesis_hc,10,50)
    doc.text("MUCOSAS: " + this.datos.nom_mucosa + "                           OBS: " + this.datos.observaciones_hc, 10,55)
    doc.text("REV EXTERNA: " + this.datos.nom_revext, 10,60)
    doc.text("SIS.NERVIOSO: " + this.datos.sis_nervioso_hc + "       SIS.RESPIRATORIO: " + this.datos.sis_respiratorio_hc, 10,65)
    doc.text("TEMPERATURA: " + this.datos.temperatura_hc + "       FREC.CARDIACA: " + this.datos.frec_cardiaca_hc + "        PESO: " + this.datos.peso_hc,10,70)
    doc.text("PRUEBAS COMPLEMENTARIAS: " +this.datos.pruebas_complementarias_hc, 10,75)
    doc.text("DIAGNOSTICO PRESUNTIVO: "+this.datos.diagn_presuntivo_hc, 10,80)
    doc.text("DIAGNOSTICO CONFIRMADO: " + this.datos.diagn_confirmado_hc,110,80)
    doc.text("MEDICO: " + this.datos.nombre_u, 10,90)
    doc.text("FIRMA: ",110,90)
    doc.addImage(this.datos.firma_u,"BASE64",130,90,40,30)
    doc.text("HIDRATACIÓN",10,120)
    doc.text("Reposición: ",10,125)
    doc.text("Mantenimiento: ",10,130)
    doc.text("Pérdidas: ",10,135)
    let data= [
      {
        'FARMACO': '4',
        'Acción':'4',
        'Dosis':'4',
        'Vía':'4',
        'Hora':'4'
      }
    ]
    let header = this.createHeaders(['FARMACO','Acción','Dosis','Vía','Hora'])
    doc.table(5, 185, data, header,  {})
    doc.save("HC.pdf")

  }
  createHeaders(keys) {
    return keys.map(key => ({
      'name': key,
      'prompt': key,
      'width':65,
      'align':'center',
      'padding':0,
    }));
  }
}
