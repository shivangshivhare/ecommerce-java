import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profilecomponent implements OnInit{
  user:any={};

  constructor(private service:UserService){}

  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem("user") || "{}");
  }

  update(){
    this.service.update(this.user).subscribe(()=>{
      alert("Updated successfully");
    });
  }
}
