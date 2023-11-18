import { Component, ViewChild, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';

import { PipeService } from './pipe.service';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class PipesComponent implements OnInit, OnDestroy, AfterViewInit {

  columns = [
    {
      'id'    : 1,
      'title' : 'Tasks to Do',
    },
    {
      'id'    : 2,
      'title' : 'Completed Tasks',
    },
    {
      'id'    : 3,
      'title' : 'Topics/Concepts to Revise',
    },
    {
      'id'    : 4,
      'title' : 'Topics/Concepts to Learn',
    },
    {
      'id'    : 5,
      'title' : 'Useful Websites for Learning',
    },
    {
      'id'    : 6,
      'title' : 'Web Dev YouTube Channels',
    },
    {
      'id'    : 7,
      'title' : 'CodePen Ideas',
    },
    {
      'id'    : 8,
      'title' : 'Practise Website Ideas',
    },
    {
      'id'    : 9,
      'title' : 'JavaScript Project Ideas',
    },
  ];

  private _unsubscribeAll : Subject<void> = new Subject<void>();

  showFiller = false;

  @ViewChild('drawer') drawer : MatSidenav;


  constructor( private _pipeService : PipeService)
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
    this._pipeService.close();

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  ngAfterViewInit(): void
  {
    this._pipeService.show.subscribe( v => {
      if( v )
        this.drawer.open();
      else
        this.drawer.close();
    });
  }


}
