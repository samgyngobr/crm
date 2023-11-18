import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

import { PipeService } from '../pipe.service';

@Component({
  selector: 'app-pipe-details',
  templateUrl: './pipe-details.component.html',
  styleUrls: ['./pipe-details.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class PipeDetailsComponent implements OnDestroy
{

    private _unsubscribeAll : Subject<void> = new Subject<void>();

    title : string = "";


    constructor( private _pipeService : PipeService )
    {
        this._pipeService.clicked.subscribe( v => {
            this.title = v;
        });

        this._unsubscribeAll = new Subject();
    }


    close(): void
    {
        this._pipeService.show.next( false );
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
