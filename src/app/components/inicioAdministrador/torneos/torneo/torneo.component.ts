import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';


@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.css']
})
export class TorneoComponent implements OnInit {
  public verificador = 1;
  constructor(public loader: LoaderService) {

   }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }

  changeVerificador(dato){
    this.verificador = dato;
  }

}
