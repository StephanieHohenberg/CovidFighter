import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {BERLIN} from './../data/city.data';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {map, switchMap} from 'rxjs/operators';
import {ListResult} from '@angular/fire/storage/interfaces';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private readonly supportedCities = [BERLIN];

  constructor(private readonly storage: AngularFireStorage) { }

  public addKmlFile(fileToUpload: File, date: Date): FilesUploadMetadata {
    const mediaFolderPath = this.getMediaFolderPathByDate(date);
    const { name } = fileToUpload;
    const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
    const uploadTask: AngularFireUploadTask = this.storage.upload(filePath, fileToUpload);
    return {
      uploadProgress$: uploadTask.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(uploadTask, filePath),
    };
  }

  public getKmlFilesForDateAndLocation(date: Date): Observable<ListResult> {
    const mediaFolderPath = this.getMediaFolderPathByDate(date);
    return this.storage.ref(mediaFolderPath).listAll();
  }

  public isGeolocationWithinSupportedCities(lat, lng): boolean {
    let result = false;
    this.supportedCities.forEach(city => {
      if (lat > city.southEast.lat && lng > city.southEast.lng
          && lat < city.northWest.lat && lng < city.northWest.lng) {
        result = true;
        return;
      }
    });
    return result;
  }

  private getMediaFolderPathByDate(date: Date): string {
    return `maps/BER/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  private getDownloadUrl$(uploadTask: AngularFireUploadTask, path: string): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL()),
    );
  }

}


