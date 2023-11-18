import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { PipesComponent } from './pipes.component';
import { PipeColumnComponent } from './pipe-column/pipe-column.component';
import { PipeDetailsComponent } from './pipe-details/pipe-details.component';

const routes: Routes = [
  {
    path      : '',
    component : PipesComponent,
    //resolve   : { res : PostsService }
  },
];

@NgModule({
  declarations: [
    PipesComponent,
    PipeColumnComponent,
    PipeDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSidenavModule,
  ],
  exports: [
    PipeColumnComponent
  ]
})
export class PipesModule { }
