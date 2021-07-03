import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
@Component({
  selector: 'app-torneo-inicio',
  templateUrl: './torneo-inicio.component.html',
  styleUrls: ['./torneo-inicio.component.css']
})
export class TorneoInicioComponent implements OnInit {

  constructor(private route:Router, public loader: LoaderService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }

} 
