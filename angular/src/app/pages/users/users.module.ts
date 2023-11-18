import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select'; 

import { UsersService, UsersUpdateResolve, UsersNewResolve } from './users.service';

import { UsersListComponent } from './users-list/users-list.component';
import { UsersNewComponent } from './users-new/users-new.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

const routes: Routes = [
  {
    path      : '',
    component : UsersListComponent,
    resolve   : { res : UsersService },
    runGuardsAndResolvers: "always",
    children  : [
      {
        path      : 'new',
        component : UsersNewComponent,
        resolve   : { res : UsersNewResolve },
      },
      {
        path      : ':id',
        component : UsersEditComponent,
        resolve   : { res : UsersUpdateResolve },
      },
    ]
  },
];

@NgModule({
  declarations: [
    UsersListComponent,
    UsersNewComponent,
    UsersEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [
    UsersService, UsersUpdateResolve, UsersNewResolve
  ],
})
export class UsersModule { }
