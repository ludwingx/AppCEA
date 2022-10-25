import { Hclinica } from './../../../interfaces/hclinica';
import { Revext } from './../../../interfaces/revext';
import { ConexionService } from './../../../servicios/conexion/conexion.service';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Especies } from 'src/app/interfaces/especies';
import { Sexos } from 'src/app/interfaces/sexos';
import { Mucosas } from 'src/app/interfaces/mucosas';
import { Preferences } from '@capacitor/preferences';
@Component({
  selector: 'app-crearhc',
  templateUrl: './crearhc.page.html',
  styleUrls: ['./crearhc.page.scss'],
})
export class CrearhcPage implements OnInit {
  especies: Especies[];
  sexos: Sexos[];
  mucosas: Mucosas[];
  revext: Revext[];
  dataStorage:any
  dataUser:any = []
  hclinica = {
    
    id_usuario: 0,

    cedulaP: "",
    nombreP: "",
    telefonoP: "",
    firmaP: ""

  }
  constructor(private conexion : ConexionService) { }

  ngOnInit() {
    this.ListEspecies();
    this.ListSexo();
    this.ListMucosa();
    Preferences.get({key: "session_user"}).then((data:any)=>{
      this.dataStorage = JSON.parse(data.value);
      this.perfil(this.dataStorage.id_usuario);

    })
  }
  ListEspecies(){
    this.conexion.getdata("especie.php/?aksi=list-especie").subscribe((data:any)=>{
      this.especies = data.listEspecies
    })
  }
  ListSexo(){
    this.conexion.getdata("sexo.php/?aksi=list-sexo").subscribe((data:any)=>{
      this.sexos = data.listSexos
    })
  }
  ListMucosa(){
    this.conexion.getdata("mucosa.php/?aksi=list-mucosa").subscribe((data:any)=>{
      this.mucosas = data.listMucosas
    })
  }
  ListRevext(){
    this.conexion.getdata("revext.php/?aksi=list-revext").subscribe((data:any)=>{
      this.revext = data.listRevext
    })
  }
  perfil(id_usuario:number){
    this.hclinica.id_usuario = id_usuario
    const body = {
      id_usuario: id_usuario,
      aksi: "profile-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
    this.dataUser = data.result;
    })
  }
  Hclinica(){
    
  }

}
