import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public loader: LoaderService) {

   }
  
 

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader.isLoading.next(false);
    },1000)
  }

}
