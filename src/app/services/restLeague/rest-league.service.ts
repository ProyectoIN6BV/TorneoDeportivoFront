import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestLeagueService {
  public uri;
  public token;
  public user;
  public httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private extractData(res:Response){
    let body = res;
    return body || [] || {};
  }

  public httpOptionsAuth = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  }
  public getToken(){
    let token = localStorage.getItem("token");
    if(token != null || token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }
  public getUser(){
    let user = JSON.parse(localStorage.getItem("user"));
    if(user != null || user != undefined){
      this.user = user;
    }else{
      this.user = null;
    }

    return this.user;
  }
  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

  saveLeague(league){ 
    let params = JSON.stringify(league);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.post(this.uri+"saveLeague",params,{headers:headers})
    .pipe(map(this.extractData))
  }

  listLeague(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+"getLeagues",{headers:headers})
    .pipe(map(this.extractData))
  }

  
  setImage(idLeague:string, params:Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject)=>{
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+'uploadLeague/'+idLeague;
      for(var i=0; i<files.length; i++){
        formData.append(name, files[i], files[i].name);
      }
      xhr.onreadystatechange = () =>{
        if(xhr.readyState ==4){
          if(xhr.status == 2){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('PUT', uri, true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);
    })
  }
}
