import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  public verify=1;
  constructor() { }

  ngOnInit(): void {
  }

  changeVerify(dato){
    this.verify = dato;
  }

}
