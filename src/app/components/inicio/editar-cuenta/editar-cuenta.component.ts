import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ResUserService } from 'src/app/services/resUser/res-user.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {
  public user:User;
  private readonly notifier;
  constructor(public loader: LoaderService, private restUser:ResUserService, private notifierService:NotifierService) { 
    this.user = restUser.getUser();
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }

  onClick(){
    delete this.user.password;
    delete this.user.role;
    this.restUser.update(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        delete res.userUpdated.password;
        localStorage.setItem("user", JSON.stringify(res.userUpdated));
        this.notifier.notify("success", res.message);
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })
  }
}
