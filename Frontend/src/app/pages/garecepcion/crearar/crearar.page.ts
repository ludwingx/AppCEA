import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crearar',
  templateUrl: './crearar.page.html',
  styleUrls: ['./crearar.page.scss'],
})
export class CreararPage implements OnInit {
  constructor() { 
  }

  ngOnInit() {
  }
  change(event){
    console.log(event.detail.value); //INTRODUCIR EL VALUE EN UN OBJETO "DATE" Y ENVIARLO
  }
  
}
