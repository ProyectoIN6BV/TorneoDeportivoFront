import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/User';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ResUserService } from 'src/app/services/resUser/res-user.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {
  users:[];
  userSelected:User;
  userSelected2:User;
  private readonly notifier;
  constructor(public loader: LoaderService, private restUser: ResUserService, private serviceNotifier: NotifierService) {
    this.getUsersData();
    this.notifier = serviceNotifier;
    this.userSelected = new User('','','',null,'','','','',[]);
    this.userSelected2 = new User('','','',null,'','','','',[]);
   }

  ngOnInit(): void {
    
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }
  getUsersData(){
    this.restUser.listusers().subscribe((res:any)=>{
      if(res.users){
        this.users = res.users;
        console.log(this.users)
      }else{
        this.notifier.notify("warning", "No hay usuarios registrados");
      }
    }, error=>{
      this.notifier.notify("error", error.error.message)
    })
  }

  clickUserSelected(user){
    this.userSelected = user;
    this.userSelected2 = this.userSelected;
  }

  updateUser(){
    delete this.userSelected2.password;
    this.restUser.updatebyAdmin(this.userSelected2).subscribe((res:any)=>{
      if(res.userUpdated){
        delete res.userUpdated.password;
        localStorage.setItem("user", JSON.stringify(res.userUpdated));
        this.notifier.notify("success", res.message);
        this.getUsersData();
      }else{
        this.notifier.notify("error", res.message);
        this.getUsersData();
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
      this.getUsersData();
    })
  }
}
