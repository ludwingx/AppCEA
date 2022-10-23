import { ConexionService } from './../../../servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Especies } from 'src/app/interfaces/especies';
import { Sexos } from 'src/app/interfaces/sexos';

@Component({
  selector: 'app-crearhc',
  templateUrl: './crearhc.page.html',
  styleUrls: ['./crearhc.page.scss'],
})
export class CrearhcPage implements OnInit {
  especies: Especies[];
  sexos: Sexos[];
  constructor(private conexion : ConexionService) { }

  ngOnInit() {
    this.ListEspecies();
    this.ListSexo();
  }
  ListEspecies(){
    this.conexion.getdata("especies.php/?aksi=list-especie").subscribe((data:any)=>{
      this.especies = data.listEspecies
    })
  }
  ListSexo(){
    this.conexion.getdata("sexo.php/?aksi=list-sexo").subscribe((data:any)=>{
      this.sexos = data.listSexos
    })
  }
}
