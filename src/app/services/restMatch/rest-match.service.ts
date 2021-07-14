import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestMatchService {
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

  createMatch(leagueId,date){
    date.date= date.dateFirst;
    let params = JSON.stringify(date);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.post(this.uri+"createMatch/"+leagueId,params,{headers:headers})
    .pipe(map(this.extractData));
  }

  removeMatch(leagueId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+"removeMatch/"+leagueId,{},{headers:headers})
    .pipe(map(this.extractData));
  }

  getSession(leagueId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+"getSession/"+leagueId,{headers:headers})
    .pipe(map(this.extractData));
    
  }


  getMatches(leagueId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+"getMatch/"+leagueId,{headers:headers})
    .pipe(map(this.extractData));
  }

  saveMatch(golesFirst, golesSecond, matchId){
    let params ={
      "goalsFirst" : golesFirst,
      "goalsSecond" : golesSecond 
    }
    let paramsFinal = JSON.stringify(params);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })

    return this.http.put(this.uri+"setPoint/"+matchId,paramsFinal,{headers:headers})
    .pipe(map(this.extractData));
  }
}
