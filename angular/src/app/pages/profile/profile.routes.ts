import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';

export default [
    {
        path     : '',
        component: ProfileComponent,
        resolve  : {
            data: () => inject(ProfileService).getData(),
        },
    },
] as Routes;
