import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#3E2723', '#5D4037', '#6D4C41','#795548','#8D6E63','#A1887F','#263238','#37474F'],
    borderColor: ['#212121', '#212121', '#212121', '#212121','#212121', '#212121','#212121', '#212121']
 }];
  public id;
  private readonly notifier;
  constructor(private restTeam:RestTeamService, private route:ActivatedRoute, private notifierService:NotifierService) {
    this.id = route.snapshot.params.nombre;
    this.notifier= notifierService;
    
   }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(){
    this.restTeam.getPosition(this.id).subscribe((res:any)=>{
      if(res.teams){
        
        for(let team of res.teams){
          console.log()
          this.pieChartLabels.push([team["name"]]);
          this.pieChartData.push(team["points"])
        }
         this.pieChartType = 'pie';
        this.pieChartLegend = true;
        this.pieChartPlugins = [];
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
        console.log(this.pieChartLabels);
      }else{
        this.notifier.notify("error", res.message)
      }
    }, error => this.notifier.notify("error", error.error.message))
  }
}
