import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  /* HOST WEB */
  server = "https://vldeveloper.com/vldeveloper.com/adminCEA/";
  /* LOCALHOST
  server = "https://localhost/AppCEA/Backend";*/
  constructor(public http: HttpClient) { }
  //CRUD
  postdata(body:any, file:string){
    return this.http.post(this.server + file, JSON.stringify(body))
  }
  //Reactivar cuenta
  reactivar(body:any, file:string){
    return this.http.post(this.server + file, JSON.stringify(body))
  }
  //mostrar
  getdata(file:string){
    return this.http.get(this.server + file)
  }
}
