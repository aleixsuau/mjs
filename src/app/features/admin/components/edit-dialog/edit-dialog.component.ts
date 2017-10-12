import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {MD_DIALOG_DATA} from '@angular/material';
// import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  editForm: FormGroup;
  tags: string[] = [];
  filteredTags: Observable<string[]>; // = ['horror', 'love', 'glam', 'ohmygod'];

  get speakers() {
    return this.editForm.controls.speakers as FormArray;
  }

  constructor(
    // public dialogRef: MdDialogRef<any>
    private formBuilder: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log('this.data.item: ', this.data.item);
    if (!this.data) { return; };
    this.editForm = this.formBuilder
                            .group({
                                title: [ this.data.item && this.data.item.title || '', [Validators.required, Validators.minLength(5)]],
                                description: [ this.data.item && this.data.item.description || '', [Validators.required, Validators.minLength(40)]],
                                date: [ this.data.item && this.data.item.date || '', Validators.required],
                                time: [ this.data.item && this.data.item.time || '', Validators.required],
                                image: [ this.data.item && this.data.item.image || '', Validators.required],
                                speakers: this.formBuilder.array([
                                  this.formBuilder.group({ name: '', contact: ''})
                                ])
                            });
  }

  onInputChange(query) {
    console.log('inputChange: ', query);
  }

  addSpeaker() {
    console.log('Add Speaker');
    this.speakers.push(this.formBuilder.group({ name: '', contact: ''}));
  }

  removeSpeaker(index) {
    console.log('Remove Speaker');
    this.speakers.removeAt(index);
  }

}
