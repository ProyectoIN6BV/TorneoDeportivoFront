import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ResUserService } from 'src/app/services/resUser/res-user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  private readonly notifier;
  token:string;
  constructor(public loader: LoaderService, private restUser: ResUserService, private notifierService: NotifierService, private router: Router) {
      this.user = new User('','','',null,'','','','ROLE_USER',[]);
      this.notifier = notifierService;
   }
  
 

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }


  onclick(login){
    this.restUser.login(this.user,'true').subscribe((res:any)=>{
      if(!res.token){
        this.notifier.notify("error", "No se generó token en la petición");
      }else{
        this.notifier.notify("success", "Logueado Correctamente");
          setTimeout(()=>{
            delete res.user.password;
            this.token = res.token;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.user = res.user;
            
            login.reset();
            if(this.user.role=="ROLE_USER"){
              this.router.navigateByUrl("home");
            }else if(this.user.role=="ROLE_ADMINLEAGUE"){
              this.router.navigateByUrl("homeAdmin")
            }
          },1000)
         

        
      }
    },error=>{
      this.notifier.notify("error", error.error.message);
    })
  }
}
