import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { League } from 'src/app/models/League';
import { User } from 'src/app/models/User';
import { CONNECTION } from 'src/app/services/global';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RestLeagueService } from 'src/app/services/restLeague/rest-league.service';
import { ResUserService } from 'src/app/services/resUser/res-user.service';
@Component({
  selector: 'app-torneo-inicio',
  templateUrl: './torneo-inicio.component.html',
  styleUrls: ['./torneo-inicio.component.css']
})
export class TorneoInicioComponent implements OnInit {
  private readonly notifier;
  public league:League;
  public user:User;
  public leagues:[];
  public fileLeagues:Array<File>;
  public uri;
  public leagueSelected:League;

  token;

  constructor(private route:Router, public loader: LoaderService, private restLeague: RestLeagueService, private restNotifier:NotifierService, private restUser:ResUserService){ 
    this.notifier = restNotifier;
    this.league = new League('','','','','',null,null,[],[]);
    this.leagueSelected = new League('','','','','',null,null,[],[]);
    this.user = restUser.getUser();
    this.token = restUser.getToken();
    this.uri = CONNECTION.URI;
  }

  selectLeague(league){
    this.leagueSelected = league;
  }

  ngOnInit(): void {
    this.getLeagues();
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
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
    this.restLeague.listLeague().subscribe((res:any)=>{
      if(res.leagues){
        this.leagues = res.leagues;
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>
      this.notifier.notify("error",error.error.message))
  }
  removeLeague(){
    this.restLeague.removeLeague(this.leagueSelected._id).subscribe((res:any)=>{
      if(res.removeLeague){
        this.notifier.notify("success",res.message);
        this.getLeagues();
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>      this.notifier.notify("error",error.error.message))
    
  }
  fileChange(fileInput){
    this.fileLeagues = <Array<File>>fileInput.target.files;
  }
} 
