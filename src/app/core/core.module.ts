import { TestingService } from './services/testing/testing.service';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FirebaseUIModule } from 'firebaseui-angular';

import { customHttpProvider } from './services/custom-http/custom-http.service';
import { CustomHttpService } from './services/custom-http/custom-http.service';
export { CustomHttpService } from './services/custom-http/custom-http.service';
import { AuthService } from './services/auth/auth.service';
import { ImageResizerService } from './services/image-resizer/image-resizer.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginMenuComponent } from './login-menu/login-menu.component';

@NgModule({
  imports: [
    SharedModule,
    FirebaseUIModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginMenuComponent
  ],
  providers: [
    customHttpProvider,
    AuthService,
    ImageResizerService,
    // TODO: Remove this service
    TestingService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginMenuComponent
  ]
})
export class CoreModule { }
