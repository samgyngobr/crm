import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export default [
    {
        path     : '',
        component: DashboardComponent,
        //resolve  : {
        //    data: () => inject(ProjectService).getData(),
        //},
    },
] as Routes;
