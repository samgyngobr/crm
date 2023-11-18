import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

export interface RouteInfo {
    path  : string;
    title : string;
    icon  : string;
    class : string;
}

export const ROUTES: RouteInfo[] = [
    { path : '/dashboard'     , title : 'Dashboard'      , icon : 'nc-bank'        , class : '' },
    { path : '/users'         , title : 'Users'          , icon : 'nc-single-02'   , class : '' },
    { path : '/teams'         , title : 'Teams'          , icon : 'nc-badge'       , class : '' },
    { path : '/pipes'         , title : 'Pipes'          , icon : 'nc-layout-11'   , class : '' },
    { path : '/icons'         , title : 'Icons'          , icon : 'nc-diamond'     , class : '' },
    { path : '/maps'          , title : 'Maps'           , icon : 'nc-pin-3'       , class : '' },
    { path : '/notifications' , title : 'Notifications'  , icon : 'nc-bell-55'     , class : '' },
    { path : '/table'         , title : 'Table List'     , icon : 'nc-tile-56'     , class : '' },
    { path : '/typography'    , title : 'Typography'     , icon : 'nc-caps-small'  , class : '' },
    { path : '/upgrade'       , title : 'Upgrade to PRO' , icon : 'nc-spaceship'   , class : '' },
    //{ path : '/user'        , title : 'User Profile'   , icon : 'nc-single-02'   , class : '' },
    //{ path : '/auth/login'  , title : 'Login'          , icon : 'nc-spaceship'   , class : '' },
    //{ path : '/auth/login'  , title : 'Login'          , icon : 'nc-spaceship'   , class : 'active-pro' },
];

@Component({
    //moduleId      : module.id,
    selector      : 'sidebar-cmp',
    templateUrl   : 'sidebar.component.html',
    styleUrls     : ['./sidebar.component.scss'],
    encapsulation : ViewEncapsulation.None,
})

export class SidebarComponent implements OnInit, OnDestroy 
{
    public  menuItems       : any[];
    private _unsubscribeAll : Subject<void> = new Subject<void>();

    public name  : string = "";
    public image : string = "";

    /**
     * Constructor
     *
     * @param {AuthenticationService} _authService
     */
    constructor(private _authService : AuthenticationService )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() 
    {
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        this._authService.user
          .pipe( takeUntil( this._unsubscribeAll ) )
          .subscribe( res => {
            this.name  = res.name;
            this.image = res.image;
          } )
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


}
