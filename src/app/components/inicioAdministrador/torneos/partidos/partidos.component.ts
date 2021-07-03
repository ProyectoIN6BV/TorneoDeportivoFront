import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.contadorFinal= this.contador1+ this.contador3;
    this.contadorFinal2 = this.contador2+ this.contador4;
  }

  changeVerify(dato){
    this.verify2 = dato;
  }
  
}
