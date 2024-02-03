import { Component, ViewChild, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class TeamsListComponent implements OnInit, OnDestroy, AfterViewInit
{
  private _unsubscribeAll : Subject<void> = new Subject<void>();

  public data : any = null;

  displayedColumns: string[] = [ 'title', 'enabled', 'edit' ]; // '_id',

  @ViewChild('drawer') drawer : MatSidenav;

    /**
     * Constructor
     *
     * @param {TeamsService} _teamsService
     * @param {Router} _router
     */
  constructor( 
    private _teamsService : TeamsService, 
    private _router       : Router,
  )
  {
    this._unsubscribeAll = new Subject();
  }

  /**
   * On init
   */
  ngOnInit(): void
  {
    this._teamsService.onDataLoaded
      .pipe( takeUntil( this._unsubscribeAll ) )
      .subscribe( res => {
        this.data = res.data;
      });
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  ngAfterViewInit(): void
  {    
    this.drawer.closedStart.subscribe( res => {
      this._router.navigate(['/teams'])
    });  

    this._teamsService.openSidebar
      .pipe( takeUntil( this._unsubscribeAll ) )
      .subscribe( res => {
          
          if(res) 
          {
            this.drawer.open();
          }
          else 
            if(!res) 
              this.drawer.close();
      });
  }


  edit( id : string )
  {
    this._router.navigate(['/teams/' + id])
  }


  new()
  {
    this._router.navigate(['/teams/new'])
  }



}
