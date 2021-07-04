import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ResUserService } from 'src/app/services/resUser/res-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  show = true;
  showFixed = false;
  public token:string;
  public role;
  uri;
  public user:User;
  
  constructor(public loader: LoaderService, private router:Router, private resUser:ResUserService){
    this.loader.isLoading.next(true);
    this.user = new User('','','',null,'','','','',null);
  }
  
  getRole(){
    if(this.user ==null){
      this.role = null;
    }else{
      this.role = this.user.role;
    }
  }

  logOut(){
    this.token = "";
    localStorage.clear();
    this.router.navigateByUrl("");
  }

  ngOnInit(): void {
    this.token = this.resUser.getToken();
    this.user = this.resUser.getUser();
    this.getRole();
  }

  ngDoCheck(){
    this.token = this.resUser.getToken();
    this.user = this.resUser.getUser();
    this.getRole();
  }
  
  changeClass(){

    let scrollPosition = window.pageYOffset;
    if(scrollPosition != 0){
      if(this.showFixed == false ){
        this.showFixed = true;
        this.show = false;
      }
    }else{
      if(this.show == false ){
        this.show = true;
        this.showFixed = false;
      }
    }

    
  }

  quitarClaseTotal(){
    this.loader.isLoading.next(true);
  }

  quitarClase(){
    document.getElementById("navbarNav").classList.remove("show");    
    this.loader.isLoading.next(true);
  }
}
