import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../users.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector      : 'app-users-edit',
  templateUrl   : './users-edit.component.html',
  styleUrls     : ['./users-edit.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class UsersEditComponent implements OnInit, OnDestroy 
{

  private _unsubscribeAll : Subject<void> = new Subject<void>();
  public  _form           : FormGroup;
  public  error           : string  = "";
  public  loading         : boolean = false;
  public  roles           : any[]   = [];  
  public  id              : any     = "";

  /**
   * Constructor
   *
   * @param {UsersService} _usersService
   * @param {NotifyService} _notifyService
   * @param {FormBuilder} _formBuilder
   */
  constructor( 
    private _usersService  : UsersService,
    private _notifyService : NotifyService,
    private _formBuilder   : FormBuilder
  )
  {
    this._unsubscribeAll = new Subject();

    this._form = this._formBuilder.group({
      name    : ['', [Validators.required]],
      email   : ['', [Validators.required, Validators.email]],
      enabled : ['', [Validators.required]],
      role    : ['', [Validators.required]],
      //password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    });        
  }


  ngOnInit(): void
  {
    this._usersService.onUpdateLoaded
      .pipe( takeUntil( this._unsubscribeAll ) )
      .subscribe( res => {

        this.id    = res.data._id;
        this.roles = res.roles;

        this._form.controls['name'   ].setValue( res.data.name     );
        this._form.controls['email'  ].setValue( res.data.email    );
        this._form.controls['enabled'].setValue( res.data.enabled  );
        this._form.controls['role'   ].setValue( res.data.role._id );
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


  close()
  {
    this._usersService.openSidebar.next(false);
  }


  onSubmit()
  {
    this.error = "";

    if (this._form.invalid)
      return

    this.loading = true;

    this._usersService.update( this.id, {
        name     : this._form.controls['name'    ].value, 
        enabled  : this._form.controls['enabled' ].value, 
        role     : this._form.controls['role'    ].value, 
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
