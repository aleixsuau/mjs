import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputFileComponent, multi: true }
  ]
})
export class InputFileComponent implements OnInit, ControlValueAccessor {
  private value: any;
  onTouch: Function;
  onModelChange: Function;
  file: any;
  @ViewChild('uploadBar')
  uploadBar: ElementRef;

  constructor() { }

  ngOnInit() {
    if (!this.file) { this.uploadBar.nativeElement.style.width = '0%'; };
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = (file) => {
      this.file = file;
      if (this.file) { 
        this.uploadBar.nativeElement.style.width = '100%';
        this.readImage(file);
      };
      fn(file);
    };
  }

  writeValue(value) {
    this.value = value || '';
  }

  removeFile() {
    // Hide uploadBar
    this.uploadBar.nativeElement.style.width = '0%';
    // Delay show the upload file input until the leave animation is done.
    setTimeout(() => {
      this.onModelChange(null);
    }, 600);
  }

  readImage(image) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.file.url = reader.result;
    };
    reader.readAsDataURL(image);
  }
}
