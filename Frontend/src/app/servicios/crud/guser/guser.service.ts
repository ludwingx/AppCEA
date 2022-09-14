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
@Injectable({
  providedIn: 'root'
})
export class GuserService {
  private url = 'https://appcea.000webhostapp.com/crud-guser.php';

  constructor(private http: HttpClient) { }
  
  getAll(){
    return this.http.get<[User]>(this.url)
  }
  //Metodo Consultar dato
  get(id_user: string){
    return this.http.get<User>(this.url + '/' + id_user);
  }
  //Metodo Crear dato
  // create(user : any){
  //   return this.http.post(this.url, user);
  // }
  create(User : any){
    return this.http.get(this.url, User);
  }
  //Metodo Actualizar dato
  update(user: User, id_user: string){
    return this.http.put(this.url+'/'+id_user, user);
  }
  //Metodo Borrar dato
  remove(id_user: string){
    return this.http.delete(`${this.url}` + '/' + id_user);
  }
}
