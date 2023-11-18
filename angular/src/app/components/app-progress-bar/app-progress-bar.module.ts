import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppProgressBarComponent } from './app-progress-bar.component';

@NgModule({
  declarations: [
    AppProgressBarComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [ AppProgressBarComponent ]
})
export class AppProgressBarModule { }
