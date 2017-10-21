import { NgModule } from '@angular/core';
import { CovalentDataTableModule } from '@covalent/core';

import { SharedModule } from './../../shared/shared.module';

import { AdminComponent } from './containers/admin/admin.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { DialogComponent } from './../../shared/components/dialog/dialog.component';


@NgModule({
  imports: [
    SharedModule,
    CovalentDataTableModule
  ],
  declarations: [
    AdminComponent,
    EditDialogComponent
  ],
  entryComponents: [
    EditDialogComponent,
    DialogComponent
  ]
})
export class AdminModule { }
