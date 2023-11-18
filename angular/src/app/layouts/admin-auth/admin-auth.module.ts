import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminAuthComponent } from './admin-auth.component';

const routes: Routes = [
  {
    path: '',
    component : AdminAuthComponent,
    children :[
      {
        path         : 'login',
        loadChildren : () => import('../../pages/login/login.module').then( m => m.LoginModule )
      },
      {
        path       : '',
        redirectTo : '/login',
        pathMatch  : 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminAuthComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
  ]
})
export class AdminAuthModule { }
