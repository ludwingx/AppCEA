import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/usuario';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { Storage } from "@capacitor/storage";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  users: User[];
  dataStorage:any
  dataUser:any = []
  constructor(private conexion: ConexionService) { }

  ngOnInit() {
    Storage.get({key: "session_user"}).then((data:any)=>{
      this.dataStorage = JSON.parse(data.value)
      this.perfil(this.dataStorage.id)
    })
  }

  perfil(id:string){
    const body = {
      id_user: id,
      aksi: "profile-user"
    }
    this.conexion.postdata(body,"usuario.php").subscribe((data:any)=>{
    this.dataUser = data.result
    })
  }

}
