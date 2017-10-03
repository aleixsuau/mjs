import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './../../features/home/containers/home/home.component';
import { AgendaPreviewComponent } from './../../features/agenda/containers/agenda-preview/agenda-preview.component';
import { AgendaComponent } from './../../features/agenda/containers/agenda/agenda.component';
import { NewsPreviewComponent } from './../../features/news/containers/news-preview/news-preview.component';
import { WorksPreviewComponent } from './../../features/works/containers/works-preview/works-preview.component';
import { AdminComponent } from './../../features/admin/containers/admin/admin.component';
import { AnimationsComponent } from './../../features/animations/animations.component';

import { AgendaResolverService } from './../../features/agenda/services/agenda-resolver/agenda-resolver.service';


const routes: Routes = [
  { path: 'animations', component: AnimationsComponent },
  {
    path: 'agenda/:id',
    component: AgendaComponent,
    resolve: {
        event: AgendaResolverService
    }
  },
  { path: 'agenda', component: AgendaPreviewComponent },
  { path: 'works', component: WorksPreviewComponent },
  { path: 'news', component: NewsPreviewComponent },
  { path: 'admin', component: AdminComponent },
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
