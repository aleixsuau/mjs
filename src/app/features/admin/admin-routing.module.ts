import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './containers/admin/admin.component';
import { CanActivateAdminService } from '../../core/guards/admin/can-activate-admin.service';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [ CanActivateAdminService ],
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
