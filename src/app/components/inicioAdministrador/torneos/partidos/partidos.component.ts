import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Session } from '../../../../models/Session';
import { RestMatchService } from 'src/app/services/restMatch/rest-match.service';
import { Match } from 'src/app/models/Match';
import { Team } from 'src/app/models/Team';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';
import { RestPlayerService } from 'src/app/services/restPlayer/rest-player.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {
  public verify2=1;
  public contadorFinal=0;
  public contadorFinal2=0;
  public session:Session;
  private readonly notifier;
  leagueId;
  sessions:[];
  matches:[];
  matchSelected:Match;
  indice;
  team1:Team;
  team2:Team;
  constructor(private notifierService:NotifierService, private restMatch:RestMatchService, route:ActivatedRoute, private restTeam:RestTeamService, private restPlayer:RestPlayerService){ 
    this.notifier = notifierService;
    this.leagueId = route.snapshot.params.nombre;
    this.session = new Session('','',null,null,[],[]);
    this.team1 = new Team('','','',null,null,null,null,null,null,null,null,[]);
    this.team2 = new Team('','','',null,null,null,null,null,null,null,null,[]);
  }


  restarGoles(player){
    player.goal = player.goal-1;
    this.contadorFinal=this.contadorFinal-1; 
  }
  
  sumarGoles(player){
    player.goal = player.goal+1;
    this.contadorFinal=this.contadorFinal+1; 
  }

  restarGoles2(player){
    player.goal = player.goal-1;
    this.contadorFinal2=this.contadorFinal2-1; 
  }
  
  sumarGoles2(player){
    player.goal = player.goal+1;
    this.contadorFinal2=this.contadorFinal2+1; 
  }
  ngOnInit(): void {
    this.getMatches();
    this.getMatchesMatches();
  }

  changeVerify(dato, match, indice){
    this.contadorFinal = 0;
    this.contadorFinal2 = 0;
    this.verify2 = dato;
    this.matchSelected = match;
    this.indice = indice;
    this.getTeam1(match.playersOne[0]);
    this.getTeam2(match.playersSecond[0])
    
  }
  changeVerify2(dato){
    this.verify2 = dato;
  }

  getTeam1(id){
    this.restTeam.getTeam(id).subscribe((res:any)=>{
      if(res.team){
        this.team1 = res.team;
        this.team1.players.map(function(dato:any){
          dato.goal = 0;
        });
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error=>this.notifier.notify("error", error.error.message))
  } 
  getTeam2(id){
    this.restTeam.getTeam(id).subscribe((res:any)=>{
      if(res.team){
        this.team2 = res.team;
        this.team2.players.map(function(dato:any){
          dato.goal = 0;
        });
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error=>this.notifier.notify("error", error.error.message))
  } 
  createMatch(){
    this.removeMatch();
    
    this.restMatch.createMatch(this.leagueId, this.session).subscribe((res:any)=>{
      if(res.date){
        this.notifier.notify("success",res.message);
        this.getMatches();
        this.getMatchesMatches();
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
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>this.notifier.notify("error", error.error.message)) 
  }

  getMatchesMatches(){
    this.restMatch.getMatches(this.leagueId).subscribe((res:any)=>{
      if(res.match){
          this.matches = res.match;
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>this.notifier.notify("error", error.error.message)) 
  }

  saveMatch(){
    this.restMatch.saveMatch(this.contadorFinal, this.contadorFinal2, this.matchSelected._id).subscribe((res:any)=>{
      if(res.teamUpdate){
        this.notifier.notify("success",res.message);
        this.getMatches();
        this.getMatchesMatches();
        this.updatePlayer1();
        this.updatePlayer2();
        this.verify2 = 1;

      }else{
        this.notifier.notify("error",res.message);
      }
    },error=>this.notifier.notify("error", error.error.message))
  }


  updatePlayer1(){
    for(let player of this.team1.players){
      this.update(player);
    }
  }
  updatePlayer2(){
    for(let player of this.team2.players){
      this.update(player);
    }
  }

  update(player){
    this.restPlayer.updatePlayerPoint(player).subscribe((res:any)=>{
      if(res.playerUpdate){

      }else{
        this.notifier.notify("error",res.message);
      }
    },error=>this.notifier.notify("error", error.error.message))
  }
}
