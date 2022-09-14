import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface Col {
  id: string;
  col1: string;
  col2: string;
  col3: string;
}
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url = 'https://appcea.000webhostapp.com/';

  constructor(private http: HttpClient) { }

  //Mostrar datos
  getAll(file:string){
    return this.http.get<[Col]>(this.url + file)
  }
  //Metodo 
  get(id: string){
    return this.http.get<Col>(this.url + '/' + id);
  }
  //Metodo Crear
  create(col:Col){
    return this.http.post(this.url, col);
  }
  //Metodo Actualizar
  update(col: Col, id: string){
    return this.http.put(this.url+'/'+id, col);
  }
  //Metodo Borrar
  remove(id: string){
    return this.http.delete(this.url + '/' + id);
  }

}



