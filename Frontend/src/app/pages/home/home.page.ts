import { Component, OnInit } from '@angular/core';
import { Storage } from "@capacitor/storage";
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  constructor(private toastCtrl: ToastController,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  async mensaje (m: string){
    const t = await this.toastCtrl.create({
      message: m,
      duration: 3000
    })
    t.present();
  }
  darkTheme(){
    document.body.classList.toggle('dark');
  }
  cerrarSession(){
    Storage.remove({key:"session_user"})
    this.mensaje("Sessión Cerrada")
    this.navCtrl.navigateRoot(['/login'])

  }
  
}
