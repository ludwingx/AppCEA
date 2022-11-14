import { ConexionService } from './../../servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  consentrega:any = []
  constructor(private conexion: ConexionService) { }

  ngOnInit() {
    this.totalEntregas();
  }
  totalEntregas(){
    this.conexion.getdata("consulta.php/?aksi=consentrega").subscribe((data:any)=>{
      this.consentrega = data.consActa
    })
  }
}
