import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from '../features/home/home.module';
import { AdminModule } from '../features/admin/admin.module';

@NgModule({
  imports: [
    HomeModule,
    AdminModule
  ],
  declarations: []
})
export class FeaturesModule { }
