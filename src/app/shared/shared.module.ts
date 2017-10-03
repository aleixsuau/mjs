import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Covalent
import { CovalentLayoutModule } from '@covalent/core';
import { CovalentCommonModule } from '@covalent/core';
import { CovalentExpansionPanelModule } from '@covalent/core';

// Components
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // Material
    MaterialModule,
    BrowserAnimationsModule,
    // Covalent
    CovalentLayoutModule,
    CovalentCommonModule,
    CovalentExpansionPanelModule
  ],
  declarations: [
    DialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    BrowserAnimationsModule,
    CovalentLayoutModule,
    CovalentCommonModule,
    CovalentExpansionPanelModule,
    DialogComponent
  ]
})
export class SharedModule { }
