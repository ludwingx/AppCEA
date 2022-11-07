import { ConexionService } from './../../servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';
import { Tatencion } from 'src/app/interfaces/atencion';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  tatencion: Tatencion[];
  consentrega:  Tatencion[];
  consrescate:  Tatencion[];
  consdecomiso:  Tatencion[];
  constructor(private conexion: ConexionService) { }

  ngOnInit() {
    this.viewEntrega();
    this.viewRescate();
    this.viewDecomiso();
  }
  viewEntrega(){
    this.conexion.getdata("consulta.php/?aksi=consentrega").subscribe((data:any)=>{
      this.consentrega = data.consActa
    })
  }
  viewRescate(){
    this.conexion.getdata("consulta.php/?aksi=consrescate").subscribe((data:any)=>{
      this.consrescate = data.consActa
    })
  }
  viewDecomiso(){
    this.conexion.getdata("consulta.php/?aksi=consdecomiso").subscribe((data:any)=>{
      this.consdecomiso = data.consActa
    })
  }

}
