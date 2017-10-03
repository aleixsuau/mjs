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

  constructor(
    // public dialogRef: MdDialogRef<any>
    private formBuilder: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log('this.data: ', this.data);
    this.editForm = this.formBuilder
                            .group({
                                title: [ this.data && this.data.title || '', [Validators.required, Validators.minLength(5)]],
                                description: [ this.data && this.data.description || '', [Validators.required, Validators.minLength(40)]],
                                date: [ this.data && this.data.date || '', Validators.required],
                                time: [ this.data && this.data.time || '', Validators.required],
                                image: [ this.data && this.data.image || '', Validators.required],
                                /*speakers: this.formBuilder.array([
                                  this.formBuilder.group({
                                    name: ['', Validators.required],
                                    contact: ['', Validators.required]
                                  })
                                ])*/
                            });
    console.log('this.editForm: ', this.editForm);
  }

  onInputChange(query) {
    console.log('inputChange: ', query);
  }

}
