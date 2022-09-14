import { User, GuserService } from 'src/app/servicios/crud/guser/guser.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  users: User[];
  constructor(private http: HttpClient, private suser: GuserService) { }

  ngOnInit() {
    this.suser.getAll().subscribe(response =>{
      this.users = response ;
    })
  }

}
