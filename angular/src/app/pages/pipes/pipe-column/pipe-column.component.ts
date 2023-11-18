import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { PipeService } from '../pipe.service';

@Component({
    selector    : 'app-pipe-column',
    templateUrl : './pipe-column.component.html',
    styleUrls   : ['./pipe-column.component.scss']
})
export class PipeColumnComponent implements OnInit, OnDestroy
{
    @Input() col: any;

    private _unsubscribeAll : Subject<void> = new Subject<void>();

    constructor( private _pipeService : PipeService )
    {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
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

    set( value: any )
    {
        this._pipeService.load( value );
    }
}
