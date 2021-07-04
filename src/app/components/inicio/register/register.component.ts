import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ResUserService } from 'src/app/services/resUser/res-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private readonly notifier: NotifierService;
  public user:User;
  public userSaved: String;
  public status:boolean;
  public passwordC;
  constructor(public loader: LoaderService, notifierService: NotifierService, private userService: ResUserService) { 
    this.notifier = notifierService;
    this.user = new User('','','',null,'','','','ROLE_USER',null);
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }

  onSubmit(register){
    this.userService.register(this.user).subscribe((res:any)=>{
      if(res.userSaved){
        this.userSaved = res.userSaved.user;
        this.user = new User('','','',null,'','','','ROLE_USER',null);
        this.notifier.notify('success', res.message);
        register.reset();
      }else{
        this.notifier.notify('warning', res.message);
      }
    }, error=>{
      this.notifier.notify('error', error.error.message);
    })
  }

}
