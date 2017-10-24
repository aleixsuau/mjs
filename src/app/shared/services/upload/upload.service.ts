import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { UploadTaskSnapshot } from 'firebase/storage';

import { Upload } from './upload';

@Injectable()
export class UploadService {
  private basePath = '/uploads';
  private _progress: BehaviorSubject<number> = new BehaviorSubject(null);
  readonly progress: Observable<number> = this._progress.asObservable().publishReplay(1).refCount();
  private _upload: BehaviorSubject<Upload> = new BehaviorSubject(null);
  readonly upload: Observable<Upload> = this._upload.asObservable().share().filter(upload => upload != null);
  private storageRef;

  constructor(private db: AngularFireDatabase) {
    this.storageRef = firebase.storage().ref();
  }

  pushUpload(section: string, upload: Upload): Observable<Upload> {
    if (!upload) { return; };
    const timeStamp = new Date().getTime();
    const uploadCopy = {...upload, name: `${timeStamp}-${upload.file.name}`};
    const uploadTask = this.storageRef
                              .child(`${this.basePath}/${section}/${uploadCopy.name}`)
                              .put(uploadCopy.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: UploadTaskSnapshot) =>  {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this._progress.next(progress);
      },
      (error) => {
        // TODO: Call notifications service
        console.log(error);
      },
      () => {
        // upload success
        uploadCopy.url = uploadTask.snapshot.downloadURL;
        this._upload.next(uploadCopy);
      }
    );
    return this.upload;
  }

  deleteUpload(section: string, file: string) {
    return this.storageRef.child(`${this.basePath}/${section}/${file}`).delete();
  }
}
