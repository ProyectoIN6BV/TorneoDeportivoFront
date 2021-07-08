import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ResUserService } from 'src/app/services/resUser/res-user.service';
@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  public user:User;
  private readonly notifier;
  constructor(public loader: LoaderService,private restUser: ResUserService, private restNotifier: NotifierService) { 
    this.user = new User('','','',null,'','','','',[]);
    this.notifier = restNotifier;

  }
  

  ngOnInit(): void {

    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }

  onSubmit(form){

    console.log("holaaa")
    this.restUser.saveUserByAdmin(this.user).subscribe((res:any)=>{
      if(res.userSaved){
        this.notifier.notify('success', res.message);
        form.reset();
      }else{
        this.notifier.notify('warning', res.message);
      }
    }, error=>{
      this.notifier.notify('error', error.error.message);
    })
  }
}
