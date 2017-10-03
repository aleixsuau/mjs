import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { customHttpProvider } from './services/custom-http/custom-http.service';
import { CustomHttpService } from './services/custom-http/custom-http.service';
export { CustomHttpService } from './services/custom-http/custom-http.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    customHttpProvider
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
