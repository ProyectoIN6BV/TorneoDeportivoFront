import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ResUserService {
  public uri: string;
  public token;
  public user;
  public status;

  public httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public httpOptionsAuth = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  }
  
  private extractData(res:Response){
    let body = res;
    return body || [] || {};
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

  register(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'saveUser', params, this.httpOptions)
    .pipe(map(this.extractData));
  }
  login(user, param){
    user.getToken = param;
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'login', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  update(user){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(user);
    return this.http.put(this.uri+'updateUser/'+user._id, params, {headers:headers})
    .pipe(map(this.extractData));
    
  }

  updatebyAdmin(user){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(user);
    return this.http.put(this.uri+'updateUserAdmin/'+user._id, params, {headers:headers})
    .pipe(map(this.extractData));
    
  }

  listusers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'getUsers',{headers:headers})
    .pipe(map(this.extractData));
  }
  
  saveUserByAdmin(user){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(user);
    return this.http.post(this.uri+'saveUserAdmin', params,{headers:headers})
    .pipe(map(this.extractData));
  }
  

  setLeagueUser(user, League){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(League);
    return this.http.put(this.uri+'setUserLeague/'+user._id, params, {headers:headers})
    .pipe(map(this.extractData));
  }

  removeUser(id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'removeUser/'+id,{}, {headers:headers})
    .pipe(map(this.extractData));
  }
}
