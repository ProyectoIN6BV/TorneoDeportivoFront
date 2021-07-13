import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Session } from '../../../../models/Session';
import { RestMatchService } from 'src/app/services/restMatch/rest-match.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit, DoCheck {
  public verify2=1;
  public contador1=0;
  public contador2=0;
  public contador3=0;
  public contador4=0;
  public contadorFinal=0;
  public contadorFinal2=0;
  public session:Session;
  private readonly notifier;
  leagueId;
  sessions:[];
  matches:[];
  constructor(private notifierService:NotifierService, private restMatch:RestMatchService, route:ActivatedRoute) { 
    this.notifier = notifierService;
    this.leagueId = route.snapshot.params.nombre;
    this.session = new Session('','',null,null,[],[]);
  }

  ngOnInit(): void {
    this.getMatches();
    this.getMatchesMatches();
  }

  ngDoCheck(){
    this.contadorFinal= this.contador1+ this.contador3;
    this.contadorFinal2 = this.contador2+ this.contador4;
  }

  changeVerify(dato){
    this.verify2 = dato;
  }

  createMatch(){
    this.removeMatch();
    
    this.restMatch.createMatch(this.leagueId, this.session).subscribe((res:any)=>{
      console.log(res);
      if(res.date){
        this.notifier.notify("success",res.message);
      }else{
        this.notifier.notify("error",res.message);
      }
    },error=> this.notifier.notify("error", error.error.message))
  }
  
  removeMatch(){
    this.restMatch.removeMatch(this.leagueId).subscribe((res:any)=>{
      if(res.remove){
        this.notifier.notify("success",res.message);
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>this.notifier.notify("error", error.error.message))
  }

  getMatches(){
    this.restMatch.getSession(this.leagueId).subscribe((res:any)=>{
      if(res.session){
          this.sessions = res.session;
          console.log(this.sessions);
          
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>this.notifier.notify("error", error.error.message)) 
  }

  getMatchesMatches(){
    this.restMatch.getMatches(this.leagueId).subscribe((res:any)=>{
      if(res.match){
          this.matches = res.match;
          console.log(this.matches)
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>this.notifier.notify("error", error.error.message)) 
  }
}
