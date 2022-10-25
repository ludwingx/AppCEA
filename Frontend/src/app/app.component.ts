import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.initializeApp()
  }
  initializeApp(){
    Preferences.get({key:"session_user"}).then((resp)=>{
      if (resp.value == null) {
        this.router.navigate(["/login"])
      } else {
        this.router.navigate(["/home"])
      }
    })
  }
  checkDarkTheme(){
    const preferDark=window.matchMedia('(prefers-color-scheme: dark)');
    if( preferDark.matches){
      document.body.classList.toggle('dark');
    }
  }
}

