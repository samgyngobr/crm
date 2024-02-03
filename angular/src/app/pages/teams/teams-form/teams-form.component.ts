import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TeamsService } from '../teams.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-teams-form',
  templateUrl: './teams-form.component.html',
})
export class TeamsFormComponent implements OnInit, OnDestroy 
{

  private _unsubscribeAll : Subject<void> = new Subject<void>();
  public  _form           : FormGroup;
  public  loading         : boolean = false;
  public  id              : any     = "";

  /**
   * Constructor
   *
   * @param {TeamsService} _teamsService
   * @param {NotifyService} _notifyService
   * @param {ActivatedRoute} _route
   * @param {FormBuilder} _formBuilder
   */
  constructor( 
    private _teamsService  : TeamsService,
    private _notifyService : NotifyService,
    private _route         : ActivatedRoute,
    private _formBuilder   : FormBuilder
  )
  {
    this._unsubscribeAll = new Subject();

    this.id = this._route.snapshot.params['id'];

    this._form = this._formBuilder.group({
      title   : ['', [Validators.required]],
      enabled : ['', [Validators.required]],
    });        
  }


  ngOnInit(): void
  {
    this._teamsService.openSidebar.next(true);

    if( this.id )
    {
      this._teamsService.onUpdateLoaded
        .pipe( takeUntil( this._unsubscribeAll ) )
        .subscribe( res => {

          this._form.controls['title'  ].setValue( res.data.title    );
          this._form.controls['enabled'].setValue( res.data.enabled  );

        });
    }  
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


  close()
  {
    this._teamsService.openSidebar.next(false);
  }


  onSubmit()
  {
    if (this._form.invalid)
      return

    this.loading = true;

    if( this.id )
      this.update();
    else
      this.create();
  }



  create()
  {
    this._teamsService.create({
        title   : this._form.controls['title'  ].value, 
        enabled : this._form.controls['enabled'].value, 
      })
      .then( res => {

        this.loading = false;

        if( !res.error )
        {
          this._notifyService.success( res.message );
        }
        else
        {
          this._notifyService.error( res.message );
        }
        
      }, err => {

        this.loading = false;
        this._notifyService.error( err );
      });   
  }


  update()
  {
    this._teamsService.update( this.id, {
        title   : this._form.controls['title'  ].value, 
        enabled : this._form.controls['enabled'].value, 
      })
      .then( res => {

        this.loading = false;

        if( !res.error )
        {
          this._notifyService.success( res.message );
        }
        else
        {
          this._notifyService.error( res.message );
        }
        
      }, err => {

        this.loading = false;
        this._notifyService.error( err );
      });   
  }


}
