import { ConexionService } from './../../servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  constructor(private conexion: ConexionService) { }

  ngOnInit() {

  }

}
