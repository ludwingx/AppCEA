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
    this.lista_animales()
  }
  Cerrar(){
    this.modalCtrl.dismiss()
  }
  lista_animales(){
    const body = {
      num_acta_ar: this.datos.num_acta_ar,
      aksi: "lista-acta-animales"
    }
    this.conexion.postdata(body,"arecepcion.php").subscribe((data:any)=>{
      this.procedente = data.procedente
    })
  }

  generarPdf(){
    var doc = new JSPDF("p","mm","legal");
    doc.addImage("assets/logoGAD.png","PNG",145,10,50,25)
    doc.setFontSize(13)
    doc.setFont("","arial")
    doc.text("SECRETARIA DE DESARROLLO SOSTENIBLE Y MEDIO AMBIENTE",doc.internal.pageSize.getWidth()/2,40,{align:"center"})
    doc.text("DIRECCIÓN DE RECURSOS NATURALES",doc.internal.pageSize.getWidth()/2,45,{align:"center"})
    doc.setFontSize(10)
    doc.text("PROGRAMA INTEGRAL DE CONSERVACIÓN DE LA BIODIVERSIDAD DEL DEPARTAMENTO DE SANTA CRUZ",doc.internal.pageSize.getWidth()/2,50,{align:"center"})
    // doc.text(this.datos.num_acta_ar,doc.internal.pageSize.getWidth()/2,80,{align:"center"})
    doc.line(140,59,75,59)
    doc.setFontSize(15)
    doc.setFont("","bold")
    doc.text("ACTA DE RECEPCIÓN", doc.internal.pageSize.getWidth()/2,58, {align:"center"})
    doc.setFont("","arial")
    doc.setFontSize(11)
    doc.text("Número de Acta: ", 10,70)
    doc.text(this.datos.num_acta_ar, 38, 70)
    doc.text("Fecha:", 100,70)
    doc.text(this.datos.fecha_ar, 115,70)
    doc.text("Hora: ", 170,70)
    doc.text(this.datos.hora_ar,180,70)
    doc.text("Tipo de atención: ", 10,80)
    doc.text(this.datos.nom_tipo_atencion, 40,80)
    doc.text("La Autoridad Ambiental Competente Departamental, a través de la Dirección de Recursos Naturales, comunica a usted", 10,90)
    doc.text("que dando cumplimiento al Marco Legal vigente: Constitución política del Estado, Código Penal, Ley 1333, Ley 700",10,95)
    doc.text("y Ley 12301, D.S 25458, Decreto Supremo N° 4489, y la resolución Administrativa SDS Y MA /001/2012 Y Decreto",10,100)
    doc.text("Departamental N° 140/2011, realiza la atención en la dirección:",10,105)
    doc.setFont("","bold")
    doc.text("Lugar donde fue la entrega, rescate o decomiso del animal: ",10,113)
    let data1 = [
      {
        Municipio: this.datos.municipioE,
        Barrio: this.datos.nom_ldfe_barrio_ar,
        'Calle/Avenida': this.datos.nom_ldfecalle_ar,
        'N° casa': this.datos.num_ldfe_casa_ar
      }
    ]
    let header1 = this.createHeaders(['Municipio','Barrio','Calle/Avenida','N° casa'])
    doc.setFont("","arial")
    doc.table(5, 115, data1, header1,  {} )
    doc.setFont("","bold")
    doc.text("Lugar donde procede el animal",10,142)
    doc.setFont("","arial")
    doc.text("(donde encontro al animal la persona que hace la denuncia o llamada): ",68,142)
    let data2 = [
      {
        Municipio: this.datos.municipioS,
        Barrio: this.datos.nom_ldp_barrio_ar,
        'Calle/Avenida': this.datos.nom_ldp_calle_ar,
        'Empresa y/o Institución': this.datos.nom_ldp_empresa_ar,
        'Área Verde, Área Protegida, otro': this.datos.nom_ldp_area_ar
      }
    ]
    let header2 = this.createHeaders2(['Municipio','Barrio','Calle/Avenida','Empresa y/o Institución','Área Verde, Área Protegida, otro'])
    doc.table(5, 145, data2, header2,  {})
    doc.setFont("","bold")
    doc.text("Especies procedentes de la atención:",10,180)
    let data3= [
      {
        'N°': '1',
        'Nombre común': this.procedente[0].nom_comun,
        'Edad': this.procedente[0].nom_edad,
        'Sexo': this.procedente[0].nom_sexo,
        'Observaciones': this.procedente[0].observaciones_rec
      },
      {
        'N°': '2',
        'Nombre común': this.procedente[1] == undefined ? "-" : this.procedente[1].nom_comun,
        'Edad': this.procedente[1] == undefined ? "-" : this.procedente[1].nom_edad,
        'Sexo': this.procedente[1] == undefined ? "-" : this.procedente[1].nom_sexo,
        'Observaciones': this.procedente[1] == undefined ? "-" : this.procedente[1].nom_sexo
      },
      
      {
        'N°': '3',
        'Nombre común': this.procedente[2] == undefined ? "-" : this.procedente[2].nom_comun,
        'Edad': this.procedente[2] == undefined ? "-" : this.procedente[2].nom_edad,
        'Sexo': this.procedente[2] == undefined ? "-" : this.procedente[2].nom_sexo,
        'Observaciones': this.procedente[2] == undefined ? "-" : this.procedente[2].observaciones_rec
      },      
      {
        'N°': '4',
        'Nombre común': this.procedente[3]== undefined ? "-" : this.procedente[3].nom_comun,
        'Edad': this.procedente[3] == undefined ? "-" : this.procedente[3].nom_edad,
        'Sexo': this.procedente[3]== undefined ? "-" : this.procedente[3].nom_sexo ,
        'Observaciones': this.procedente[3]== undefined ? "-" : this.procedente[3].observaciones_rec
      }
    ]
    let header3 = this.createHeaders4(['N°','Nombre común','Edad','Sexo','Observaciones'])
    doc.table(5, 185, data3, header3,  {})
    doc.text("Las especies serán derivados a la SDS YMA de la Gobernación de Santa Cruz, instalaciones del CAD:",10,250)
    doc.line(10,251,180,251)
    doc.setFont("","bold")
    doc.text("Funcionario recepcionante:",10,255)
    doc.text("Persona (Entidad) que efectúa la entrega:",110,255)
    doc.setFont("","arial")
    doc.text("Nombre:",10,260)
    doc.text(this.datos.nombre_u,28, 260)
    doc.text("Nombre:",110,260)
    doc.text(this.datos.nombreC,130, 260)
    doc.text("Firma:",10,275)
    doc.addImage(this.datos.firma_u,"BASE64",30,265,40,20)
    doc.text("Firma:",110,275)
    doc.addImage(this.datos.firma,"BASE64",122,265,40,20)
    doc.text("C.I.:",10,300)
    doc.text(this.datos.ci_u,28, 300)
    doc.text("Telf.:",110,293)
    doc.text(this.datos.telefono,130, 293)
    doc.text("C.I.:",110,300)
    doc.text(this.datos.cedula,130, 300)


    doc.save("AR"+ this.datos.num_acta_ar +".pdf")
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
  createHeaders2(keys) {
    return keys.map(key => ({
      'name': key,
      'prompt': key,
      'width':53,
      'align':'center',
      'padding':0,
    }));
  }
  createHeaders3(keys) {
    return keys.map(key => ({
      'name': key,
      'prompt': key,
      'width':60,
      'align':'center',
      'padding':0,
    }));
  }
  createHeaders4(keys) {
    return keys.map(key => ({
      'name': key,
      'prompt': key,
      'width':53,
      'align':'center',
      'padding':0,
    }));
  }
  async presentToast(m:string) {
    const toast = await this.toastCtrl.create({
      message: m,
      duration: 2000
    });
    toast.present();
  }
}
