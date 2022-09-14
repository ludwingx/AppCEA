import { User, GuserService } from './../../../servicios/crud/guser/guser.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
 
@Component({
  selector: 'app-crearuser',
  templateUrl: './crearuser.page.html',
  styleUrls: ['./crearuser.page.scss'],
})

export class CrearuserPage implements OnInit {
  @Input() user: User;
  isUpdate = false;
  data: any = {
    name:'',
    email:'',
    password:'',
    id_cargo: '',
  };
  users: User[]
  constructor(private suser : GuserService,
     private modalCtrl : ModalController) { 
  }
  ngOnInit() { 
    this.suser.getAll().subscribe(response => {
      this.users = response;
    });
    if(this.user){
      this.isUpdate = true;
      this.data = this.user;
    }
  }
  closeModal(){
    this.modalCtrl.dismiss(null,'close');
  }

  onSubmit(form: NgForm){
    console.log(this.data);
    const user = form.value;
    this.suser.create(user).subscribe(response =>{
      this.modalCtrl.dismiss(response, 'created');
    });
    // if(this.isUpdate){
    //   this.suser.update(user, this.user.id_user).subscribe(()=>{
    //     user.id_user = this.user.id_user;
    //     this.modalCtrl.dismiss(user, 'update');
    //   });
    // }else{
    //   this.suser.create(user).subscribe(response =>{
    //     this.modalCtrl.dismiss(response, 'created');
    //   });
    // }
    
  }
}
