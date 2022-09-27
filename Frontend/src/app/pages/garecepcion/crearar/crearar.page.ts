import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { Tatencion } from './../../../interfaces/atencion';
import { Component, OnInit } from '@angular/core';
import { Municipios } from './../../../interfaces/municipios';
@Component({
  selector: 'app-crearar',
  templateUrl: './crearar.page.html',
  styleUrls: ['./crearar.page.scss'],
})
export class CreararPage implements OnInit {
  tatencion: Tatencion[];
  municipios: Municipios[];
  constructor(private conexion  : ConexionService,) { 
  }

  ngOnInit() { 
    this.ListAtencion()
    this.ListMunicipios()
  }

  ListAtencion(){
    this.conexion.getdata("atencion.php/?aksi=list-tatencion").subscribe((data:any)=>{
      this.tatencion = data.listTatencion
    })
  }
  ListMunicipios(){
    this.conexion.getdata("municipio.php/?aksi=list-municipio").subscribe((data:any)=>{
      this.municipios = data.listMunicipios
    })
  }

  change(event){
    console.log(event.detail.value); //INTRODUCIR EL VALUE EN UN OBJETO "DATE" Y ENVIARLO
  }
}
