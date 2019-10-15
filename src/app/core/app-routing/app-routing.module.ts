import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './../../features/home/containers/home/home.component';
import { SectionComponent } from './../../shared/components/section/section.component';
import { AdminComponent } from './../../features/admin/containers/admin/admin.component';

import { CanActivateAdminService } from './../guards/admin/can-activate-admin.service';
import { SectionResolverService } from './../services/section-resolver/section-resolver.service';

const routes: Routes = [
  {
    path: 'agenda',
    component: SectionComponent,
    resolve: { data: SectionResolverService }
  },
  {
    path: 'agenda/:id',
    component: SectionComponent,
    resolve: { data: SectionResolverService }
  },
  {
    path: 'jobs',
    component: SectionComponent,
    resolve: { data: SectionResolverService }
  },
  {
    path: 'jobs/:id',
    component: SectionComponent,
    resolve: { data: SectionResolverService }
  },
  {
    path: 'news',
    component: SectionComponent,
    resolve: { data: SectionResolverService,
    }
  },
  {
    path: 'news/:id',
    component: SectionComponent,
    resolve: { data: SectionResolverService,
    }
  },
  {
    path: 'admin',
    canActivate: [ CanActivateAdminService ],
    component: AdminComponent
  },
  /* {
    path: 'admin',
    loadChildren: 'app/features/admin/admin.module#AdminModule',
  }, */
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
