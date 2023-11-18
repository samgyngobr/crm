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

import { TeamsListComponent } from './teams-list/teams-list.component';
import { TeamsFormComponent } from './teams-form/teams-form.component';

import { TeamsService, TeamsUpdateResolve } from './teams.service';

const routes: Routes = [
  {
    path      : '',
    component : TeamsListComponent,
    resolve   : { res : TeamsService },
    runGuardsAndResolvers: "always",
    children  : [
      {
        path      : 'new',
        component : TeamsFormComponent,
      },
      {
        path      : ':id',
        component : TeamsFormComponent,
        resolve   : { res : TeamsUpdateResolve },
      },
    ]
  },
];

@NgModule({
  declarations: [
    TeamsListComponent,
    TeamsFormComponent
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
    TeamsService, TeamsUpdateResolve 
  ],
})
export class TeamsModule { }
