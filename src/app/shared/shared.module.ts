import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Flex
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { DialogComponent } from './components/dialog/dialog.component';
import { SectionComponent } from './components/section/section.component';

// Services
import { UploadService } from './services/upload/upload.service';
import { UppercaserPipe } from './pipes/uppercaser/uppercaser.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { InputFileComponent } from './components/input-file/input-file.component';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTableModule,
    BrowserAnimationsModule,
    // Flex
    FlexLayoutModule,
  ],
  declarations: [
    DialogComponent,
    InputFileComponent,
    // TODO: remove this
    UppercaserPipe,
    FilterPipe,
    TruncatePipe,
    CardComponent,
    SectionComponent,
  ],
  providers: [
    UploadService
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTableModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DialogComponent,
    InputFileComponent,
    CardComponent,
    SectionComponent,
    UppercaserPipe,
    FilterPipe,
    TruncatePipe,
  ]
})
export class SharedModule { }
