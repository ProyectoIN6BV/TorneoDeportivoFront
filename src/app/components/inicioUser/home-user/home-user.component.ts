import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RestLeagueService } from 'src/app/services/restLeague/rest-league.service';
import { ResUserService } from 'src/app/services/resUser/res-user.service';
import {  Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { League } from 'src/app/models/League';
import { User } from 'src/app/models/User';
import { CONNECTION } from 'src/app/services/global';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  private readonly notifier;
  public league:League;
  public user:User;
  public leagues:[];
  public fileLeagues:Array<File>;
  public uri;
  token;
  
  constructor(private route:Router, public loader: LoaderService, private restLeague: RestLeagueService, private restNotifier:NotifierService, private restUser:ResUserService){ 
    this.notifier = restNotifier;
    this.league = new League('','','','','',null,null,[],[])
    this.user = restUser.getUser();
    this.token = restUser.getToken();
    this.uri = CONNECTION.URI;
  }

  onSubmit(){
    this.restLeague.saveLeague(this.league).subscribe((res:any)=>{
      if(res.saveLeague){
        this.notifier.notify("success", res.message);
        this.updateUser(res.saveLeague);
        this.setImageLeague(res.saveLeague._id, this.fileLeagues);
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
        this.notifier.notify("error",error.error.message)
    })
  }
  
  updateUser(leagueFind){
    this.restUser.setLeagueUser(this.user, leagueFind).subscribe((res:any)=>{
      if(res.pushUser){
        localStorage.setItem("user", JSON.stringify(res.pushUser));
        this.notifier.notify("success", res.message);
        
      }else{
        this.notifier.notify("error",res.message);
      }
    },error=>{
      this.notifier.notify("error",error.error.message)
    })
  }

  setImageLeague(idLeague, files){
    this.restLeague.setImage(idLeague,[],files,this.token, 'image')
    .then((res:any)=>{
      if(res.league){
        
      }else{
        this.notifier.notify("error",res.message);
      }
    }).catch((err) => {
      this.getLeagues();
    });
  }
  
  getLeagues(){
    this.restLeague.listLeagueUser(this.user._id).subscribe((res:any)=>{
      console.log(res)
      if(res.users){
        this.leagues = res.users.leagues;
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>
      this.notifier.notify("error",error.error.nessage))
  }
  ngOnInit(): void {
    this.getLeagues();
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }

  fileChange(fileInput){
    this.fileLeagues = <Array<File>>fileInput.target.files;
  }

}
