import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TypographyComponent } from './typography.component';

const routes: Routes = [
  {
    path      : '',
    component : TypographyComponent,
  },
];

@NgModule({
  declarations: [ TypographyComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TypographyModule { }
