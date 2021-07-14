import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestTeamService {
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


  getTeams(id){
    let  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+"getLeagueTeam/"+id, {headers:headers})
    .pipe(map(this.extractData))
  }


  saveTeams(team){
    let  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params  = JSON.stringify(team);
    return this.http.post(this.uri+'saveTeam',params, {headers:headers})
    .pipe(map(this.extractData));
  }

  setTeamLeague(id, team){
    let  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params  = JSON.stringify(team);
    return this.http.put(this.uri+'setTeamLeague/'+id,params, {headers:headers})
    .pipe(map(this.extractData));
  }


  setImage(idTeams:string, params:Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject)=>{
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+'uploadTeam/'+idTeams;
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

  getTeam(id){
    let  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+"getTeam/"+id, {headers:headers})
    .pipe(map(this.extractData));
  }


  getPosition(id){
    let  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+"listaPosition/"+id, {headers:headers})
    .pipe(map(this.extractData));
  }
}
