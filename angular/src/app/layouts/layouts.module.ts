import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { SidebarModule } from '../sidebar/sidebar.module';
import { FooterModule } from '../components/footer/footer.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { FixedPluginModule } from '../components/fixedplugin/fixedplugin.module';

import { AppRoutes } from '../app.routing';

@NgModule({
  declarations: [ AdminAuthComponent, AdminLayoutComponent ],
  imports: [
    CommonModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: false
    }),
    NgbModule,
    FormsModule,

    SidebarModule,
    FooterModule,
    NavbarModule,
    FixedPluginModule,

  ]
})
export class LayoutsModule { }
