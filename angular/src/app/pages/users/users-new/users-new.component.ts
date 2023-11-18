import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, ValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../users.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class UsersNewComponent implements OnInit, OnDestroy  
{
  private _unsubscribeAll : Subject<void> = new Subject<void>();
  public  _form           : FormGroup;
  public  data            : any     = null;
  public  error           : string  = "";
  public  loading         : boolean = false;
  public  roles           : any[]   = [];  

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
      name            : ['', [Validators.required]],
      email           : ['', [Validators.required, Validators.email]],
      enabled         : ['', [Validators.required]],
      role            : ['', [Validators.required]],
      //password        : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/')]],
      //passwordConfirm : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/')]]

      password: [
        '',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ @$!%*?&#]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(6)
        ])
      ],
      passwordConfirm: [
        '',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ @$!%*?&#]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(6)
        ])
      ]//,
      //retypePassword: ['', [Validators.required, Validators.pattern(this.validation.valPassword)]]

    }, { 
      validator: ConfirmedValidator('password', 'passwordConfirm')
    });   
  }


  ngOnInit(): void
  {
    this._usersService.onNewLoaded
      .pipe( takeUntil( this._unsubscribeAll ) )
      .subscribe( res => {
        this.roles = res.roles;
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

    this._usersService.create({
        name     : this._form.controls['name'    ].value, 
        email    : this._form.controls['email'   ].value, 
        enabled  : this._form.controls['enabled' ].value, 
        role     : this._form.controls['role'    ].value, 
        password : this._form.controls['password'].value 
      })
      .then( res => {

        this.loading = false;

        if( !res.error )
        {
          this._form.reset();
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


export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {

    const control         = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    //if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
    //    return;
    //}

    if (control.value !== matchingControl.value) 
    {
      matchingControl.setErrors({ confirmedValidator: true });
    } 
    else 
    {
      matchingControl.setErrors(null);
    }
  }

}





export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null || {};
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null || {}: error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword')?.value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword')?.setErrors({ NoPassswordMatch: true });
    }
  }
}





