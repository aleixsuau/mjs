import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
// Firebase
import { AuthMethods, AuthProvider, FirebaseUIAuthConfig, FirebaseUIModule, AuthProviderWithCustomConfig } from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './core/app-routing/app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { AgendaModule } from './features/agenda/agenda.module';
import { NewsModule } from './features/news/news.module';
import { JobsModule } from './features/jobs/jobs.module';
import { AdminModule } from './features/admin/admin.module';

import { AppComponent } from './app.component';
// Gestures support
import 'hammerjs';

import { AppConfig } from './app.config';

import { AdminComponent } from './features/admin/containers/admin/admin.component';
import { AnimationsComponent } from './features/animations/animations.component';

import { enableProdMode } from '@angular/core';

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

// Firebase Auth Config
const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    AuthProvider.Github,
    AuthProvider.Password,
  ],
  method: AuthMethods.Redirect,
  tos: '<your-tos-link>' // Terms & Conditions Link
};

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
    // Firebase
    AngularFireModule.initializeApp(
      environment.firebase,
    ),
    AngularFireAuthModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireDatabaseModule,
    // Custom modules
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HomeModule,
    AgendaModule,
    NewsModule,
    JobsModule,
    AdminModule
  ],
  providers: [
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
