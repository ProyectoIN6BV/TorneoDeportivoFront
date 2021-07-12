import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestPlayerService {
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


  savePlayer(id,player){
    let params = JSON.stringify(player);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.post(this.uri+'setPlayerToTeam/'+id, params, {headers:headers})
    .pipe(map(this.extractData))
  }


  getPlayers(id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'getPlayersTeam/'+id, {headers:headers})
    .pipe(map(this.extractData))
  }

  editPlayer(id, player){
    let params = JSON.stringify(player);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'updateMatchPlayer/'+id, params, {headers:headers})
    .pipe(map(this.extractData))
  }


  removePlayer(id){
   
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'removePlayer/'+id, {headers:headers})
    .pipe(map(this.extractData))
  }
}
