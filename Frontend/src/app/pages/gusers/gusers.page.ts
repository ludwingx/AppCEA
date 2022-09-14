import { CrearuserPage } from './crearuser/crearuser.page';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { User, GuserService } from 'src/app/servicios/crud/guser/guser.service';

@Component({
  selector: 'app-gusers',
  templateUrl: './gusers.page.html',
  styleUrls: ['./gusers.page.scss'],
})
export class GusersPage implements OnInit {
  users: User[];
  constructor(private suser: GuserService,
     private alertCtrl: AlertController,
      private modalCtrl : ModalController) { }

  ngOnInit() {
    this.suser.getAll().subscribe(response => {
      this.users = response;
    });
  }
  addUser(){
    this.modalCtrl.create({
      component: CrearuserPage
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) =>{
      if (role === 'created'){
        this.users.push(data);
      }
    })
  }
  updateUser(user: User){
    this.modalCtrl.create({
      component: CrearuserPage,
      componentProps: { user }
    })
    .then(modal => {
      modal.present();
      return modal.onDidDismiss();
    })
    .then(({ data, role }) => {
      this.users = this.users.filter(std => {
        if (data.id_user === std.id_user) {
          return data;
        }
        return std; 
      });
    });
  }
  removeUser(id_user:string){
    this.alertCtrl.create({
      header: 'Eliminar',
      message: '¿Estás seguro de que quieres eliminar el usuario?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.suser.remove(id_user).subscribe(() => {
            this.users = this.users.filter(std => std.id_user !== id_user)
          });
        }
      },
      {text: 'No'}
    ]
    })
    .then(alertEl => alertEl.present());
  }

}
