import {Component, Input, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-intro-header',
  templateUrl: './intro-header.component.html',
  styleUrls: ['./intro-header.component.css']
})
export class IntroHeaderComponent implements OnInit {

  @Input() public geolocationActivated = false;
  @Input() public supportedGeolocation = false;
  @Output() public dataUploaded = new EventEmitter<Date>();
  public reply = -1;

  constructor(public snackBar: MatSnackBar,
              private translate: TranslateService) { }

  public ngOnInit(): void {
  }

  public selectionChanged(reply: number): void {
    if (reply == 1) {
      this.snackBar.open( this.translate.instant('SNACK.GET_WELL'), 'Close', { duration: 4000 });
    }
  }

}
