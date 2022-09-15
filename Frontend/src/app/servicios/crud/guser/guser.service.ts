import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User{
  id_user: string;
  name: string;
  email: string;
  password: string;
  id_cargo: string;
  ncargo: string;
}
export interface Cargos{
  id_cargo: string;
  ncargo: string;
}
@Injectable({
  providedIn: 'root'
})
export class GuserService {
  private urluser = 'https://appcea.000webhostapp.com/api/';
  private urlcargo = 'https://appcea.000webhostapp.com/api/getcargos.php';

  constructor(private http: HttpClient) { }
  
  getAll(){
    return this.http.get<[User]>(this.urluser + 'crud-guser.php')
  }
  getCargos(){
    return this.http.get<[Cargos]>(this.urlcargo)
  }
  //Metodo Consultar datos
  get(id_user: string){
    return this.http.get<User>(this.urluser + '/' + id_user);
  }
    //Metodo crear datos
  create(User : any){
    console.log(User)
    return this.http.post(this.urluser + 'postuser.php',User);
  }
  //Metodo Actualizar datos
  update(id_user: string){
    return this.http.get(this.urluser +'/'+id_user);
  }
  //Metodo Borrar datos
  remove(id_user: string){
    return this.http.get(this.urluser + 'putuser.php' + '/' + id_user);
  }
}
