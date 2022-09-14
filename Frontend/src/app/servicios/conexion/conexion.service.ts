import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  /* HOST WEB */
  server = "https://appcea.000webhostapp.com/";
  /* LOCALHOST
  server = "https://localhost/AppCEA/Backend";*/
  constructor(public http: HttpClient) { }
  //login
  postdata(body:any, file:string){
    return this.http.post(this.server + file, JSON.stringify(body))
  }
  //consultar
  getdata(file:string){
    return this.http.get(this.server + file)
  }
  //eliminar
  deletedata(){
    return this.http.get(""/*+ id*/);
  }
  //guardar --AQUI NO SE NOMBRA ID, ES UNICO
  savedata(/* nombre:string, email:string, password:string*/){
    return this.http.get(""/* +nombre + '&email=' + email + '&password=' + password */);
  }
  //actualizar
  putdata(id:string, nombre:string, direccion:string){
    return this.http.get(''/* + id + '&nombre=' + nombre +  '&email=' + email */);
  }
}
