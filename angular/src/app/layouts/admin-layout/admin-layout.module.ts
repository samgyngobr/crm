import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarModule } from '../../sidebar/sidebar.module';
import { FooterModule } from '../../components/footer/footer.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FixedPluginModule } from '../../components/fixedplugin/fixedplugin.module';

import { AuthGuard } from '../../auth.guard';

import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
  {
    path        : '',
    component   : AdminLayoutComponent,
    children    : [
      {
        path         : 'dashboard',
        loadChildren : () => import('../../pages/dashboard/dashboard.module').then( m => m.DashboardModule ),
        canActivate  : [AuthGuard],
      },
      {
        path : 'error',
        loadChildren : () => import('../../pages/error/error.module').then( m => m.ErrorModule ),
      },
      {
        path         : 'icons',
        loadChildren : () => import('../../pages/icons/icons.module').then( m => m.IconsModule ),
        canActivate  : [AuthGuard],
      },
      {
        path         : 'maps',
        loadChildren : () => import('../../pages/maps/maps.module').then( m => m.MapsModule ),
        canActivate  : [AuthGuard],
      },
      {
        path         : 'notifications',
        loadChildren : () => import('../../pages/notifications/notifications.module').then( m => m.NotificationsModule ),
        canActivate  : [AuthGuard],
      },
      {
        path         : 'user',
        loadChildren : () => import('../../pages/user/user.module').then( m => m.UserModule ),
        canActivate  : [AuthGuard],
      },
      {
        path         : 'table',
        loadChildren : () => import('../../pages/table/table.module').then( m => m.TableModule ),
        canActivate  : [AuthGuard],
      },
      {
        path         : 'typography',
        loadChildren : () => import('../../pages/typography/typography.module').then( m => m.TypographyModule ),
        canActivate  : [AuthGuard],
      },
      {
        path         : 'upgrade',
        loadChildren : () => import('../../pages/upgrade/upgrade.module').then( m => m.UpgradeModule ),
        canActivate  : [AuthGuard],
      },
      {
        path         : 'pipes',
        loadChildren : () => import('../../pages/pipes/pipes.module').then( m => m.PipesModule ),
        canActivate  : [AuthGuard],
      },      
      {
        path         : 'users',
        loadChildren : () => import('../../pages/users/users.module').then( m => m.UsersModule ),
        canActivate  : [AuthGuard],
      },
      {
        path         : 'teams',
        loadChildren : () => import('../../pages/teams/teams.module').then( m => m.TeamsModule ),
        canActivate  : [AuthGuard],
      },
      {
        path       : '',
        redirectTo : '/dashboard',
        pathMatch  : 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,

    SidebarModule,
    FooterModule,
    NavbarModule,
    FixedPluginModule,
  ],
  declarations: [
    AdminLayoutComponent
  ],
  providers: [ ]
})

export class AdminLayoutModule {}
