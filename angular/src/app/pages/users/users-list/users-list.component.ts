import { Component, ViewChild, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit
{
  private _unsubscribeAll : Subject<void> = new Subject<void>();

  public data : any = null;

  displayedColumns: string[] = [ 'name', 'email', 'role', 'enabled', 'edit' ]; // '_id',

  @ViewChild('drawer') drawer : MatSidenav;

    /**
     * Constructor
     *
     * @param {UsersService} _usersService
     * @param {Router} _router
     * @param {ChangeDetectorRef} _cd
     */
  constructor( 
    private _usersService : UsersService, 
    private _router       : Router,
    private _cd           : ChangeDetectorRef
  )
  {
    this._unsubscribeAll = new Subject();
  }

  /**
   * On init
   */
  ngOnInit(): void
  {
    this._usersService.onDataLoaded
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
      this._router.navigate(['/users'])
    });  

    this._usersService.openSidebar
      .pipe( takeUntil( this._unsubscribeAll ) )
      .subscribe( res => {
          
          if(res) 
          {
            this.drawer.open();
          }
          else if(!res) 
            this.drawer.close();

          this._cd.detectChanges();
      });
  }


  edit( id : string )
  {
    this._router.navigate(['/users/' + id])
  }


  new()
  {
    this._router.navigate(['/users/new'])
  }

}
