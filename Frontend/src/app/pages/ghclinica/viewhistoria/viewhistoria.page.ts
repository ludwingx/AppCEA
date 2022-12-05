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
  tratamiento:any = []
  datos:any
  constructor(private modalCtrl: ModalController,
              private conexion: ConexionService,
              private navParam: NavParams,
              private platform: Platform,
              private toastCtrl: ToastController,
              private file: File) { }

  ngOnInit() {
    this.datos = this.navParam.get("historia");
    this.lista_hc();
    console.log(this.tratamiento)
  }
  Cerrar(){
    this.modalCtrl.dismiss()
  }
  lista_hc(){
    const body = {
      id_historia_clinica: this.datos.id_historia_clinica,
      aksi: "lista-historia-animales"
    }
    this.conexion.postdata(body,"hclinica.php").subscribe((data:any)=>{
      this.tratamiento = data.tratamiento
    })
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
    doc.setFont("bold")
    doc.setFontSize(10)
    doc.text("FECHA: "+ this.datos.fecha_hc,10,27)
    doc.text("HORA: " + this.datos.hora_hc,45,27)
    doc.text("Centro de Atención y Derivación",10,30)
    doc.text("SDMA - DIRENA",10,33)
    doc.setFontSize(8)
    doc.text("Prog. Conservación de la Biodiversidad del Dpto. SC",10,36)
    doc.setFontSize(12)
    doc.setFont("bold")
    doc.text("ESPECIE:",10,45)
    doc.setFont("regular")
    doc.text(this.datos.nom_especies,35,45)
    doc.setFont("bold")
    doc.text("NOMBRE COMÚN:" + this.datos.nom_comun,60,45)
    doc.text("SEXO:" + this.datos.nom_sexo,130,45)
    doc.text("EDAD:" + this.datos.nom_edad,170,45)
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
    doc.addImage(this.datos.firma_u,"BASE64",130,85,40,20)
    doc.text("HIDRATACIÓN",10,110)
    doc.text("Reposición: "+ this.datos.hreposicion_hc,10,115)
    doc.text("Mantenimiento: "+this.datos.hmantenimiento_hc,10,120)
    doc.text("Pérdidas: "+this.datos.hperdidas_hc,10,125)
    let data= [
      {
        'FARMACO': this.tratamiento[0].farmaco_td,
        'Acción': this.tratamiento[0].accion_td,
        'Dosis': this.tratamiento[0].dosis_td,
        'Vía': this.tratamiento[0].via_td,
        'Hora':this.tratamiento[0].hora_td
      },
      {
        'FARMACO': this.tratamiento[1]== undefined ? "-" : this.tratamiento[1].farmaco_td,
        'Acción': this.tratamiento[1] == undefined ? "-" : this.tratamiento[1].accion_td,
        'Dosis': this.tratamiento[1]== undefined ? "-" : this.tratamiento[1].dosis_td ,
        'Vía': this.tratamiento[1]== undefined ? "-" : this.tratamiento[1].via_td,
        'Hora':this.tratamiento[1]== undefined ? "-" : this.tratamiento[1].hora_td
      },
      
    ]
    let header = this.createHeaders(['FARMACO','Acción','Dosis','Vía','Hora'])
    doc.setFontSize(13)
    doc.setFont("bold")
    doc.line(10,128,205,128)
    doc.line(10,142,10,128)
    doc.text("TRATAMIENTO",10,132)
    doc.line(10,134,205,134)
    doc.line(205,142,205,128)
    doc.text("DIAGNOSTICO",10,138)
    doc.table(10, 140, data, header,  {})
    doc.save("HC.pdf")

  }
  createHeaders(keys) {
    return keys.map(key => ({
      'name': key,
      'prompt': key,
      'width':52,
      'align':'center',
      'padding':0,
    }));
  }
}
