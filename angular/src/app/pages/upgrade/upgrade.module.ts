import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UpgradeComponent } from './upgrade.component';

const routes: Routes = [
  {
    path      : '',
    component : UpgradeComponent,
  },
];

@NgModule({
  declarations: [ UpgradeComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UpgradeModule { }
