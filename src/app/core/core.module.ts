import { SectionResolverService } from './services/section-resolver/section-resolver.service';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FirebaseUIModule } from 'firebaseui-angular';

import { customHttpProvider } from './services/custom-http/custom-http.service';
import { CustomHttpService } from './services/custom-http/custom-http.service';
export { CustomHttpService } from './services/custom-http/custom-http.service';
import { AgendaService } from './services/agenda/agenda.service';
import { JobsService } from './services/jobs/jobs.service';
import { NewsService } from './services/news/news.service';
import { AuthService } from './services/auth/auth.service';
import { ImageResizerService } from './services/image-resizer/image-resizer.service';
import { UserService } from './services/user/user.service';
import { UsersService } from './services/users/users.service';
import { ScrollToService } from './services/scroll-to/scroll-to.service';
import { CanActivateAdminService } from './guards/admin/can-activate-admin.service';
import { TestingService } from './services/testing/testing.service';

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
    AgendaService,
    SectionResolverService,
    JobsService,
    NewsService,
    UserService,
    UsersService,
    ScrollToService,
    CanActivateAdminService,
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
