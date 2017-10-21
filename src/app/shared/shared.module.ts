import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Covalent
import { CovalentLayoutModule } from '@covalent/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentExpansionPanelModule } from '@covalent/core';

// Flex
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { DialogComponent } from './components/dialog/dialog.component';

// Services
import { UploadService } from './services/upload/upload.service';
import { UppercaserPipe } from './pipes/uppercaser/uppercaser.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { InputFileComponent } from './components/input-file/input-file.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MaterialModule,
    BrowserAnimationsModule,
    // Covalent
    CovalentLayoutModule,
    CovalentCommonModule,
    CovalentExpansionPanelModule,
    // Flex
    FlexLayoutModule,
  ],
  declarations: [
    DialogComponent,
    InputFileComponent,
    // TODO: remove this
    UppercaserPipe,
    FilterPipe,
  ],
  providers: [
    UploadService
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    CovalentLayoutModule,
    CovalentCommonModule,
    CovalentExpansionPanelModule,
    FlexLayoutModule,
    DialogComponent,
    InputFileComponent,
    UppercaserPipe,
    FilterPipe,
  ]
})
export class SharedModule { }
