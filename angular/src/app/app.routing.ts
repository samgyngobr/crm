import { Routes } from '@angular/router';

import { AdminAuthComponent } from 'src/app/layouts/admin-auth/admin-auth.component';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
 
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component   : AdminAuthComponent,
    children : [
      { path : 'login', loadChildren : () => import('src/app/pages/login/login.routes') },
    ]
  },
  {
    path: '',
    component : AdminLayoutComponent,
    children: [

      /**
       * Standalone Components
       */
      { path : 'dashboard', loadChildren : () => import('src/app/pages/dashboard/dashboard.routes') },
      { path : 'profile'  , loadChildren : () => import('src/app/pages/profile/profile.routes'    ) },

      /**
       * Modules Based Components
       */
      { path : 'users'         , loadChildren : () => import('src/app/pages/users/users.module'                ).then( m => m.UsersModule ) },
      { path : 'teams'         , loadChildren : () => import('src/app/pages/teams/teams.module'                ).then( m => m.TeamsModule ) },
      { path : 'pipes'         , loadChildren : () => import('src/app/pages/pipes/pipes.module'                ).then( m => m.PipesModule ) },
      { path : 'icons'         , loadChildren : () => import('src/app/pages/icons/icons.module'                ).then( m => m.IconsModule ) },
      { path : 'maps'          , loadChildren : () => import('src/app/pages/maps/maps.module'                  ).then( m => m.MapsModule ) },
      { path : 'notifications' , loadChildren : () => import('src/app/pages/notifications/notifications.module').then( m => m.NotificationsModule ) },
      { path : 'table'         , loadChildren : () => import('src/app/pages/table/table.module'                ).then( m => m.TableModule ) },
      { path : 'typography'    , loadChildren : () => import('src/app/pages/typography/typography.module'      ).then( m => m.TypographyModule ) },
      { path : 'upgrade'       , loadChildren : () => import('src/app/pages/upgrade/upgrade.module'            ).then( m => m.UpgradeModule ) },

    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
