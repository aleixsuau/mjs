import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Source: https://gist.github.com/dcollien/312bce1270a5f511bf4a
@Injectable()
export class ImageResizerService {
  hasBlobConstructor;
  hasArrayBufferViewSupport;
  hasToBlobSupport;
  hasBlobSupport;
  hasReaderSupport;

  private _image: BehaviorSubject<{file: File, didItResize: boolean}> = new BehaviorSubject(null);
  readonly image$: Observable<{file: File, didItResize: boolean}> = this._image.asObservable();

  constructor() {
    this.hasBlobConstructor = typeof(Blob) !== 'undefined' && (function () {
      try {
          return Boolean(new Blob());
      } catch (e) {
          return false;
      }
    }());

    this.hasArrayBufferViewSupport = this.hasBlobConstructor && typeof(Uint8Array) !== 'undefined' && (function () {
      try {
          return new Blob([new Uint8Array(100)]).size === 100;
      } catch (e) {
          return false;
      }
    }());

    this.hasToBlobSupport = (typeof HTMLCanvasElement !== "undefined" ? HTMLCanvasElement.prototype.toBlob : false);
    this.hasBlobSupport = (this.hasToBlobSupport || (typeof Uint8Array !== 'undefined' && typeof ArrayBuffer !== 'undefined' && typeof atob !== 'undefined'));
    this.hasReaderSupport = (typeof FileReader !== 'undefined' || typeof URL !== 'undefined');
  }

  resize(file, maxDimensionsParam) {
    const maxDimensions = maxDimensionsParam || { width: 640, height: 480 };

    if (!this.isSupported() || !file.type.match(/image.*/)) {
      this._image.next({file, didItResize: false});
    }

    if (file.type.match(/image\/gif/)) {
      // TODO: use https://github.com/antimatter15/whammy to convert gif to webm
      this._image.next({file, didItResize: false});
    }

    const image = document.createElement('img');

    image.onload = (imgEvt) => {
      let width  = image.width;
      let height = image.height;
      let isTooLarge = false;

      if (width >= height && width > maxDimensions.width) {
        // width is the largest dimension, and it's too big.
        height *= maxDimensions.width / width;
        width = maxDimensions.width;
        isTooLarge = true;
      } else if (height > maxDimensions.height) {
        // either width wasn't over-size or height is the largest dimension
        // and the height is over-size
        width *= maxDimensions.height / height;
        height = maxDimensions.height;
        isTooLarge = true;
      }

      if (!isTooLarge) {
        // early exit; no need to resize
        this._image.next({file, didItResize: false});
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);

      if (this.hasToBlobSupport) {
        canvas.toBlob((blob) => {
          const fileData = { name: file.name, url: file.url};
          const fileFromBlob = new File([blob], file.name);
          this._image.next({file: fileFromBlob, didItResize: true});
        }, file.type);
      } else {
        const blob = this._toBlob(canvas, file.type);
        const fileFromBlob = new File([blob], file.name);
        this._image.next({file: fileFromBlob, didItResize: true});
      }
    };

    this._loadImage(image, file);
    return this.image$;
  }

  _toBlob(canvas, type) {
      let dataURI = canvas.toDataURL(type);
      let dataURIParts = dataURI.split(',');
      let byteString;
      if (dataURIParts[0].indexOf('base64') >= 0) {
          // Convert base64 to raw binary data held in a string:
          byteString = atob(dataURIParts[1]);
      } else {
        // Convert base64/URLEncoded data component to raw binary data:
          byteString = decodeURIComponent(dataURIParts[1]);
      }
      let arrayBuffer = new ArrayBuffer(byteString.length);
      let intArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i += 1) {
          intArray[i] = byteString.charCodeAt(i);
        }

      let mimeString = dataURIParts[0].split(':')[1].split(';')[0];
      let blob = null;

      if (this.hasBlobConstructor) {
          blob = new Blob(
            [this.hasArrayBufferViewSupport ? intArray : arrayBuffer],
              {type: mimeString}
          );
        } else {
          let bb = new window['BlobBuilder']();
          bb.append(arrayBuffer);
          blob = bb.getBlob(mimeString);
      }

      return blob;
    }

  _loadImage(image, file, callback?) {
    if (typeof(URL) === 'undefined') {
      let reader = new FileReader();
      reader.onload = function(evt) {
        image.src = evt.target['result'];
        if (callback) { callback(); }
      };
      reader.readAsDataURL(file);
    } else {
      image.src = URL.createObjectURL(file);
      if (callback) { callback(); }
    }
  };

  isSupported() {
      return (
        (typeof(HTMLCanvasElement) !== 'undefined')
        && this.hasBlobSupport
        && this.hasReaderSupport
      );
  }

}
