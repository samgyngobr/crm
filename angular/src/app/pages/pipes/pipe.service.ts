import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PipeService
{
    public clicked : BehaviorSubject<any>;
    public show    : BehaviorSubject<any>;

    constructor()
    {
        this.clicked = new BehaviorSubject( null  );
        this.show    = new BehaviorSubject( false );
    }

    load( data : any )
    {
        this.clicked.next( data );
        this.show.next( true );
    }

    close()
    {
        this.clicked.next( null );
        this.show.next( false );
    }
}
