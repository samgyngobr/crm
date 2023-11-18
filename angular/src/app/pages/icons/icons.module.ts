import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IconsComponent } from './icons.component';

const routes: Routes = [
  {
    path      : '',
    component : IconsComponent,
  },
];

@NgModule({
  declarations: [ IconsComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class IconsModule { }
