import { Component, OnInit } from '@angular/core';
import { Asilvestre } from 'src/app/interfaces/asilvestre';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';

@Component({
  selector: 'app-ghclinica',
  templateUrl: './ghclinica.page.html',
  styleUrls: ['./ghclinica.page.scss'],
})
export class GhclinicaPage implements OnInit {
  asilvestresin : Asilvestre[];
  asilvestrecon : Asilvestre[];
  constructor(private conexion: ConexionService) { }

  ngOnInit() {
    this.ListAnimalesSilvestresCon();
    this.ListAnimalesSilvestresSin();
  }
  ListAnimalesSilvestresCon(){
    this.conexion.getdata("asilvestre.php/?aksi=list-AsilvestreCon").subscribe((data:any)=>{
      this.asilvestrecon = data.listAsilvestreCon
    })
  }
  ListAnimalesSilvestresSin(){
    this.conexion.getdata("asilvestre.php/?aksi=list-AsilvestreSin").subscribe((data:any)=>{
      this.asilvestresin = data.listAsilvestreSin
    })
  }
}
