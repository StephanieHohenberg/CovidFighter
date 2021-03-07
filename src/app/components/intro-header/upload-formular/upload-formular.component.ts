import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MapService} from '../../../services/map.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {EMPTY, Observable, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

export enum TestOption {
  NONE = '-',
  PCR_TEST = 'TESTED_POSITIVE.FORM.OPTION_PCR',
  PCR_SCHNELL_TEST = 'TESTED_POSITIVE.FORM.OPTION_PCR_SCHNELL',
  ANTIGEN_TEST = 'TESTED_POSITIVE.FORM.OPTION_ANTIGEN',
  CORONA_SELBST_TEST = 'TESTED_POSITIVE.FORM.OPTION_SELBSTTEST',
  ANTIKOERPER_TEST = 'TESTED_POSITIVE.FORM.OPTION_ANTIBODY',
  UNSURE = 'TESTED_POSITIVE.FORM.OPTION_UNSURE',
  CLOSE = 'TESTED_POSITIVE.FORM.OPTION_FRIEND',
}

@Component({
  selector: 'app-upload-formular',
  templateUrl: './upload-formular.component.html',
  styleUrls: ['./upload-formular.component.css']
})
export class UploadFormularComponent implements OnInit, OnDestroy {

  @Input() public hasUndefinedGeoDataErrorMessage = false;
  @Input() public hasUnsupportedGeoDataErrorMessage = false;
  @Output() public dataUploaded = new EventEmitter<Date>();
  public isLoading = false;

  public testOptions: TestOption[] = Object.values(TestOption);
  public selectedTestOption = TestOption.NONE;
  public uploadedDates: Date[] = [];
  public hasAgreed = true;
  public uploadProgress$: Observable<number>;
  private unsubscribe$ = new Subject();

  constructor(private readonly mapService: MapService, public snackBar: MatSnackBar,
              private translate: TranslateService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getTodaysGoogleTimelineLink(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `https://www.google.com/maps/timeline?pb=!1m2!1m1!1s${year}-${month}-${day}`;
  }

  public onSubmitKmlFile(selectedFile): void {
    if (this.hasUndefinedGeoDataErrorMessage || this.hasUnsupportedGeoDataErrorMessage) {
      return;
    }

    const file: File = selectedFile.files[0];
    const date = this.getDateByFileName(file.name);
    if (!date) {
      this.snackBar.open(this.translate.instant('SNACK.WRONG_FILE_FORMAT'), 'Close', { duration: 4000 });
      return;
    }

    if (this.isDateDeprecated(date)) {
      this.snackBar.open(this.translate.instant('SNACK.TOO_OLD_DATE'), 'Close', { duration: 4000 });
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
            this.snackBar.open(this.translate.instant('SNACK.ERROR_UPLOAD'), 'Close', { duration: 4000 });
            console.log(error.message);
            return EMPTY;
          })
        ).subscribe((downloadUrl) => {
          this.snackBar.open(this.translate.instant('SNACK.SUCCESS_UPLOAD'), 'Close', { duration: 4000 });
          this.uploadedDates.push(date);
          this.dataUploaded.emit(date);
          this.isLoading = false;
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

  private isDateDeprecated(date: Date): boolean {
    const earliestValidDay = new Date();
    earliestValidDay.setHours(0, 0, 0, 0);
    earliestValidDay.setDate(earliestValidDay.getDate() - 14);
    return date <= earliestValidDay;
  }
}
