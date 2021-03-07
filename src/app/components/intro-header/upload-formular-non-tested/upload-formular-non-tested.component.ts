import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

export enum UploadOption {
  NONE = '-',
  LOCALLY = 'NON_TESTED.FORM.OPTION_LOCAL',
  SERVER = 'NON_TESTED.FORM.OPTION_SERVER',
}

@Component({
  selector: 'app-upload-formular-non-tested',
  templateUrl: './upload-formular-non-tested.component.html',
  styleUrls: ['./upload-formular-non-tested.component.css']
})
export class UploadFormularNonTestedComponent implements OnInit, OnDestroy {

  public uploadOptions: UploadOption[] = Object.values(UploadOption);
  public selectedUploadOption = UploadOption.NONE;
  public email = new FormControl('', [Validators.required, Validators.email]);
  private unsubscribe$ = new Subject();

  constructor(public snackBar: MatSnackBar,
              private translate: TranslateService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSubmitKmlFile(selectedFile): void {
    this.snackBar.open( this.translate.instant('SNACK.FEATURE_COMING_SOON'), 'Close', { duration: 4000 });

    if (this.selectedUploadOption === UploadOption.NONE) {
      this.selectedUploadOption = UploadOption.LOCALLY;
    } else if (this.selectedUploadOption === UploadOption.SERVER) {
      this.email.markAsTouched();
      if (this.email.invalid) {
        return;
      }
    }
  }

  public isServerUpload(option): boolean {
    return option === UploadOption.SERVER;
  }

  public getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'NON_TESTED.FORM.ERROR_REQUIRED';
    }

    return this.email.hasError('email') ? 'NON_TESTED.FORM.ERROR_INVALID' : '';
  }
}
