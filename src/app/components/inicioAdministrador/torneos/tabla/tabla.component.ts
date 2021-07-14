import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  teams:[];
  private id;
  private readonly notifier;
  constructor(private restTeam: RestTeamService, private notifiers:NotifierService, private route: ActivatedRoute) { 
    this.id = route.snapshot.params.nombre;
    this.notifier = notifiers;
  }

  ngOnInit(): void {
    this.getTeams();
  }
  getTeams(){
    this.restTeam.getPosition(this.id).subscribe((res:any)=>{
      if(res.teams){
        this.teams = res.teams;
      }else{
        this.notifier.notify("error",res.message)
      }
    }, error=>this.notifier.notify("error",error.error.message))
  }

}
