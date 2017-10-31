import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UploadService } from './../../../../shared/services/upload/upload.service';
import { ImageResizerService } from './../../../../core/services/image-resizer/image-resizer.service';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  editForm: FormGroup;
  image: IImage;
  // When editing an existing image, save a copy in case the user
  // Deletes the image anc close the dialog without saving changes
  imageBackup: IImage;
  uploadPercentage: number;
  uploading: boolean;

  get speakers() {
    return this.editForm.controls.speakers as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private imageResizerService: ImageResizerService,
    private dialog: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (!this.data) { return; };
    this.editForm = this.formBuilder
                            .group({
                                title: [ this.data.item && this.data.item.title || '', [Validators.required, Validators.minLength(5)]],
                                description: [ this.data.item && this.data.item.description || '', [Validators.required, Validators.minLength(5)]],
                                date: [ this.data.item && this.data.item.date || '', Validators.required],
                                time: [ this.data.item && this.data.item.time || '', Validators.required],
                                image: [ this.data.item && this.data.item.image  || '', Validators.required],
                                speakers: this.formBuilder.array([], Validators.required),
                            });

    // If the dialog is editing an existing item (comes with data)
    if (this.data.item) {
      // Set the image for the view
      this.image = this.data.item.image;
      this.imageBackup = {...this.data.item.image};
      this.data.item.speakers
                      .forEach(speaker => {
                        this.speakers.push(this.formBuilder.group(speaker));
                      });
    } else {
      this.addSpeaker();
    }
  }

  addSpeaker() {
    this.speakers.push(this.formBuilder.group({ name: '', contact: ''}));
  }

  removeSpeaker(index) {
    this.speakers.removeAt(index);
  }

  processDialogResult(formValue) {
    // If it's a new event or the user has deleted the image
    // the image is a new file, so upload it.
    if (!this.image) {
      this.imageResizerService
                .resize(formValue.image, { width: 800, height: 100 })
                .filter(resizedImage => resizedImage != null)
                .switchMap((resizedImage) => {
                  this.uploading = true;
                  return this.uploadFile(resizedImage);
                })
                .subscribe((uploadedImage) => {
                  const formResult = {
                    ...formValue,
                    image: {
                      title: uploadedImage.name,
                      url: uploadedImage.url,
                      size: uploadedImage.file.size
                    }
                  };
                  if (this.imageBackup && this.imageBackup.title !== formResult.image.title) {
                    this.uploadService.deleteUpload(this.data.section, this.imageBackup.title);
                  }
                  this.uploading = false;
                  this.dialog.close(formResult);
                });
    } else {
      this.dialog.close(formValue);
    }
  }

  uploadFile(file) {
    if (!file) { return; };
    // Set upload % for the mat-progress-bar
    this.uploadService
            .progress
            .subscribe((progress) => {
              this.uploadPercentage = progress;
            });

    return this.uploadService
                  .pushUpload(this.data.section, file);
  }

  deleteFile() {
    this.image = null;
    this.editForm.controls.image.setValue('');
  }

}
