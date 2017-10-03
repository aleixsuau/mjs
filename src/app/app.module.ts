import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './core/app-routing/app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { AgendaModule } from './features/agenda/agenda.module';
import { NewsModule } from './features/news/news.module';
import { WorksModule } from './features/works/works.module';
import { AdminModule } from './features/admin/admin.module';

import { AppComponent } from './app.component';
// Gestures support
import 'hammerjs';

import { AppConfig } from './app.config';

// TODO: Remove in-memory-web-api
// Imports for loading & configuring the in-memory web api (test REST API)
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/services/in-memory-data.service';
import { AdminComponent } from './features/admin/containers/admin/admin.component';
import { AnimationsComponent } from './features/animations/animations.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    // in-memory-web-api
    InMemoryWebApiModule.forRoot(
      InMemoryDataService,
      { passThruUnknownUrl: true }
    ),
    // Custom modules
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HomeModule,
    AgendaModule,
    NewsModule,
    WorksModule,
    AdminModule
  ],
  providers: [
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
