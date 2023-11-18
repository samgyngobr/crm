import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { LoadingService } from '../../services/loading.service';
import { NotifyService } from '../../services/notify.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy
{

  private _unsubscribeAll : Subject<void> = new Subject<void>();
  public  loginForm       : FormGroup;
  public  loading         : boolean = false;
  public  error           : string  = "";


  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   * @param {LoadingService} _loadingService
   * @param {NotifyService} _notifyService
   * @param {AuthenticationService} _authService
   */
  constructor(
    private _router         : Router,
    private _formBuilder    : FormBuilder,
    private _loadingService : LoadingService,
    private _notifyService  : NotifyService,
    private _authService    : AuthenticationService
  )
  {
    this._unsubscribeAll = new Subject();

    this.loginForm = this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    });
  }


  /**
   * On init
   */
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


  onSubmit()
  {
    this.error = "";

    if (this.loginForm.invalid)
      return

    this.loading = true;

    this._authService.login( 
        this.loginForm.controls['email'].value, 
        this.loginForm.controls['password'].value 
      )
      .pipe( first() )
      .subscribe( res => {

        this.loading = false;
        this._router.navigate(['/']);

      }, err => {

        this.error   = err;
        this.loading = false;
      
      }); 
  }


}
