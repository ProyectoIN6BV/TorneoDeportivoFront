import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-home-administrador',
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.css']
})
export class HomeAdministradorComponent implements OnInit {

  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }

}
