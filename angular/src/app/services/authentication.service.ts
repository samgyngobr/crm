import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import * as moment from "moment";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // https://blog.angular-university.io/angular-jwt-authentication/

  public user       : BehaviorSubject<any>;
  public isLoggedIn : boolean = false;

 
  /**
   * Constructor
   *
   * @param {HttpClient} http
   */
  constructor(
    private http: HttpClient
  )
  {
    this.user = new BehaviorSubject(null);

    let logged = localStorage.getItem("logged");

    if( logged == 'true' )
    {
      this.isLoggedIn = true;

      this.setLocalUser( JSON.parse( localStorage.getItem('currentUser') || '{}' ) );
    }
    else
    {
      this.isLoggedIn = false;
    }
  }


  /**
   * login
   *
   * @param {string} username
   * @param {string} password
   */
  login(username: string, password: string)
  {
    return this.http.post<any>(environment.path + environment.login, {
        "email"    : username,
        "password" : password
      })
      .pipe( map( res => {

        //this.user = user;
        this.isLoggedIn = true;
        this.setSession( res.user );

        return res.user;
      }));
  }


  private setLocalUser( usr : any )
  {
    this.user.next(usr);
  }

   
  private setSession(authResult : any) 
  {
    localStorage.setItem('logged'      , "true" );
    localStorage.setItem('currentUser' , JSON.stringify( authResult ));

    this.setLocalUser( authResult );
  }          



  logout() 
  {
    this.isLoggedIn = false;
    localStorage.setItem('logged', "false" );
    localStorage.removeItem('currentUser');
  }



  //public isLoggedIn() {
  //  return moment().isBefore(this.getExpiration());
  //}



  //isLoggedOut() {
  //  return !this.isLoggedIn();
  //}

  //getExpiration() {
  //  const expiration = localStorage.getItem("expires_at") || "";
  //  const expiresAt = JSON.parse(expiration);
  //  return moment(expiresAt);
  //} 




}
