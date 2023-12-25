import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ProfileService } from './profile.service';
import { NotifyService } from '../../services/notify.service';

@Component({
    selector   : 'app-profile',
    standalone : true,
    imports    : [ JsonPipe, NgIf, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule ],
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit, OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public _form     : FormGroup;
    public _formPass : FormGroup;
    public currentUser : any;
    public loading : boolean = false;
    public loadingPass : boolean = false;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     * @param {NotifyService} _notifyService
     * @param {FormBuilder} _formBuilder
     */
    constructor( 
        private _profileService : ProfileService,
        private _notifyService : NotifyService,
        private _formBuilder   : FormBuilder
    )
    {        
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the data
        this._profileService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) =>
            {
                // Store the data
                this.currentUser = res.data;
            });

        this._form = this._formBuilder.group({
            name  : ['', [Validators.required]],
            email : ['', [Validators.required, Validators.email]],
        });             

        this._formPass = this._formBuilder.group({
            old  : ['', [Validators.required]],
            new  : ['', [Validators.required]],
            newc : ['', [Validators.required]],
        });             
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    onSubmit()
    {
        if (this._form.invalid)
            return

        /*
        this._profileService.update({
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
        */
    }

}
