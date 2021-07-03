import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }

}
