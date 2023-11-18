import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService implements Resolve<any> 
{
  openSidebar    : BehaviorSubject<any>;
  onDataLoaded   : BehaviorSubject<any>;
  onUpdateLoaded : BehaviorSubject<any>;
  onNewLoaded    : BehaviorSubject<any>;

  data       : any;
  dataUpdate : any;
  dataNew    : any;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor( private _httpClient: HttpClient )
  {
    // Set the defaults
    this.openSidebar    = new BehaviorSubject(false);
    this.onDataLoaded   = new BehaviorSubject([]);
    this.onUpdateLoaded = new BehaviorSubject([]);
    this.onNewLoaded    = new BehaviorSubject([]);
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise( ( resolve, reject ) => {

      Promise.all([

        this.getData()

      ]).then( () => {

        resolve([]);

      }, reject );

    });
  }


  /**
   * Get getData
   */
  getData(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      this._httpClient.get( environment.path + environment.teams )
        .subscribe( ( response: any ) => {

          this.data = response;
          this.onDataLoaded.next(this.data);
          this.openSidebar.next(false);

          resolve(this.data);

        }, reject);

    });
  }


  create( arr : any ) : Promise<any>
  {
    return new Promise((resolve, reject) => {

      this._httpClient.post( environment.path + environment.teams, arr )
        .subscribe( ( response: any ) => {

          resolve(response);

        }, reject);
    });
  }


  update( id: any, arr : any ) : Promise<any>
  {
    return new Promise((resolve, reject) => {

      this._httpClient.put( environment.path + environment.teams + '/' + id , arr )
        .subscribe( ( response: any ) => {

          resolve(response);

        }, reject);
    });
  }

  /**
   * Get update data
   */
  getUpdateData( id : string ): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      this._httpClient.get( environment.path + environment.teams + '/' + id )
        .subscribe( ( response: any ) => {

          this.dataUpdate = response;
          this.onUpdateLoaded.next(this.dataUpdate);
          this.openSidebar.next(true);

          resolve(this.dataUpdate);

        }, reject);

    });
  }


}




@Injectable()
export class TeamsUpdateResolve implements Resolve<any>
{
    /**
     * Constructor
     *
     * @param {TeamsService} _teamsService
     */
    constructor( private _teamsService: TeamsService ){}

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @returns {Promise<any>}
     */
    resolve(route: ActivatedRouteSnapshot): Promise<any>
    {
      var id : any = route.paramMap.get('id');
      return this._teamsService.getUpdateData(id);
    }

}
