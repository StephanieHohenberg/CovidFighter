import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../../services/map.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {EMPTY, Observable, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

export enum TestOption {
  NONE = '-',
  PCR_TEST = 'PCR Test',
  PCR_SCHNELL_TEST = 'PCR Schnelltest',
  ANTIGEN_TEST = 'Antigen-Test',
  CORONA_SELBST_TEST = 'Corona-Selbsttest',
  ANTIKOERPER_TEST = 'Antikörper-Test',
  UNSURE = 'Unsure',
  CLOSE = 'A close acquaintance got tested.',
}

@Component({
  selector: 'app-upload-formular',
  templateUrl: './upload-formular.component.html',
  styleUrls: ['./upload-formular.component.css']
})
export class UploadFormularComponent implements OnInit, OnDestroy {

  @Input() public hasUndefinedGeoDataErrorMessage = false;
  @Input() public hasUnsupportedGeoDataErrorMessage = false;
  public isLoading = false;

  public testOptions: TestOption[] = Object.values(TestOption);
  public selectedTestOption = TestOption.NONE;
  public uploadedDates: Date[] = [];
  private unsubscribe$ = new Subject();
  private uploadProgress$: Observable<number>;

  constructor(private readonly mapService: MapService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSubmitKmlFile(selectedFile): void {
    if (this.hasUndefinedGeoDataErrorMessage || this.hasUnsupportedGeoDataErrorMessage) {
      return;
    }

    const file: File = selectedFile.files[0];
    const date = this.getDateByFileName(file.name);
    if (!date) {
      this.snackBar.open( 'Your file was in the wrong format. Try it again.', 'Close', { duration: 4000 });
      return;
    }

    this.isLoading = true;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const { downloadUrl$, uploadProgress$ } = this.mapService.addKmlFile(file, date);
      this.uploadProgress$ = uploadProgress$;
      downloadUrl$
        .pipe(
          takeUntil(this.unsubscribe$),
          catchError((error) => {
            this.isLoading = false;
            this.snackBar.open( 'Sorry. Something went wrong. Try it again.', 'Close', { duration: 4000 });
            console.log(error.message);
            return EMPTY;
          })
        ).subscribe((downloadUrl) => {
          this.snackBar.open( 'Successful upload', 'Close', { duration: 4000 });
          this.uploadedDates.push(date);
          // TODO if it is today's data display in map
          this.isLoading = false;
          console.log(downloadUrl);
      });
    });
    reader.readAsDataURL(file);
  }

  private getDateByFileName(fileName: string): Date {
    // history-2021-mm-dd.kml
    const subDash = fileName.split('-');
    const subDot = fileName.split('.');
    if (subDash.length !== 4 || subDash[0] !== 'history' || subDot.length !== 2 || subDot[1] !== 'kml') {
      return null;
    }
    const year = +subDash[1];
    const month = +subDash[2];
    const day = +subDash[3].split('.')[0];

    const date = new Date();
    date.setFullYear(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}
