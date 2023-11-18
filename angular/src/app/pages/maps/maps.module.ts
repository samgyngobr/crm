import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './maps.component';

const routes: Routes = [
  {
    path      : '',
    component : MapsComponent,
  },
];

@NgModule({
  declarations: [ MapsComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MapsModule { }
