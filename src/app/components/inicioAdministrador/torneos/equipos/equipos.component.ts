import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/Team';
import { CONNECTION } from 'src/app/services/global';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RestPlayerService } from 'src/app/services/restPlayer/rest-player.service';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  public verify=1;
  id;
  teams:[];
  team:Team;
  public teamSelected:Team;
  public fileTeam:Array<File>;
  private readonly notifier;
  private token;
  public uri;
  public player:Player;
  public players:[];
  public playerSelected:Player;
  constructor(public loader: LoaderService , private restTeam: RestTeamService, private route: ActivatedRoute, private serviceNotifier: NotifierService, private restPlayer:RestPlayerService) {
    this.notifier = serviceNotifier;
    this.team = new Team('','','',null, null,null,null,null,null,null,null,[]);
    this.uri = CONNECTION.URI;
    this.token = restTeam.getToken();
    this.player = new Player('','','','','',null, null, null, null);
    this.playerSelected = new Player('','','','','',null, null, null, null);
  }


  changePlayer(player){
    this.playerSelected = player;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.nombre;
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
    this.getTeams();
  }

  changeVerify(dato, team){
    this.verify = dato;
    this.teamSelected = team;
    this.getPlayers();
  }

  edit(){
    this.restPlayer.editPlayer(this.playerSelected._id, this.playerSelected).subscribe((res:any)=>{
      if(res.playerUpdate){
        this.notifier.notify("success",res.message);
        this.getPlayers();
      }else{
        this.notifier.notify("error",res.message);
      }
    },error=>this.notifier.notify("error",error.error.message))
  }
  getTeams(){
    this.restTeam.getTeams(this.id).subscribe((res:any)=>{
        if(res.ls){
          
          this.teams = res.ls.teams;
          console.log(res.ls)
        }else{
          this.notifier.notify("warning", res.message);
        }
    }, error=> this.notifier.notify("error", error.error.message)
    )
  }

  onSubmit(){
    this.restTeam.saveTeams(this.team).subscribe((res:any)=>{
      if(res.saveTeam){
        this.notifier.notify("success", res.message);
        this.setTeamLeague(res.saveTeam,this.id);
        this.setImageTeam(res.saveTeam._id, this.fileTeam);
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error => this.notifier.notify("error", error.error.message));
  }
  
  setTeamLeague(team,id){
    this.restTeam.setTeamLeague(id,team).subscribe((res:any)=>{
      if(res.pushLeague){
        this.notifier.notify("success", res.message);
      }else{
        this.notifier.notify("error", res.message);
      }
    }, error=> this.notifier.notify("error", error.error.message))
  }

  setImageTeam(idTeam, files){
    this.restTeam.setImage(idTeam,[],files,this.token, 'image')
    .then((res:any)=>{
      if(res.league){
        this.notifier.notify("success", res.message);
      }else{
        this.notifier.notify("error",res.message);
      }
    }).catch((err) => {
      this.getTeams();
    });
  }

  fileChange(fileInput){
    this.fileTeam = <Array<File>>fileInput.target.files;
  }


  savePlayer(){
    this.restPlayer.savePlayer(this.teamSelected._id, this.player).subscribe((res:any)=>{
      if(res.playerSaved){
        this.notifier.notify("success",res.message);
        this.getPlayers();
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>this.notifier.notify("error",error.error.message))
  }


  getPlayers(){
    this.restPlayer.getPlayers(this.teamSelected._id).subscribe((res:any)=>{
      if(res.teams){
        this.players = res.teams.players;
      }else{
        this.notifier.notify("error",res.message);
      }
    },error=>this.notifier.notify("error",error.error.message))
  }

  editTotal(){
    this.playerSelected.cardT = (this.playerSelected.cardA*1+this.playerSelected.cardR*1);
  }
  
  remove(){
    this.restPlayer.removePlayer(this.playerSelected._id).subscribe((res:any)=>{
      if(res.playerDrop){
        this.notifier.notify("success",res.message);
        this.getPlayers();
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>this.notifier.notify("error",error.error.message))
  }

}
