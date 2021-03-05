import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from './services/map.service';
import {takeUntil} from 'rxjs/operators';
import {from, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {GoogleSignInModalComponent} from './components/google-sign-in-modal/google-sign-in-modal.component';
import firebase from 'firebase';
import ListResult = firebase.storage.ListResult;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public lat;
  public lng;
  public isLoading = false;
  public geolocationActivated = false;
  public supportedGeolocation = false;
  public kmlLayerLinks = [];
  private unsubscribe$ = new Subject();

  constructor(private readonly mapService: MapService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.retrieveLocationAndMapDataForToday();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onDateChanged(date: Date): void {
    this.retrieveMapDataForDate(date);
  }

  public getStepsForDateStepper(): number[] {
    return window.innerWidth < 992 ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  }
  public isMobile(): boolean {
    return window.innerWidth < 768;
  }

  public isTablet(): boolean {
    return window.innerWidth < 992 && window.innerHeight < 992;
  }

  private retrieveLocationAndMapDataForToday(): void {
    this.snackBar.open( 'Activate your location to use this app', 'Close', { duration: 4000 });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.geolocationActivated = true;
        this.supportedGeolocation = this.mapService.isGeolocationWithinSupportedCities(this.lat, this.lng);
        if (!this.supportedGeolocation) {
          this.snackBar.open(
            'Sorry. This app is still in the experimental phase. We do not support your city yet.',
            'Close',
            { duration: 4000 }
          );
        }
        this.retrieveMapDataForDate(new Date());
      });
    }
  }

  private retrieveMapDataForDate(selectedDate: Date): void {
    if (!this.geolocationActivated || !this.supportedGeolocation) {
      return;
    }

    this.isLoading = true;
    this.kmlLayerLinks = [];
    // TODO: timeout
    this.mapService.getKmlFilesForDateAndLocation(selectedDate)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        listResult => { this.fillKmlLayerLinkList(listResult); },
        error => { this.openSignInDialog(); });
  }

  private fillKmlLayerLinkList(listResult: ListResult): void {
    listResult.items.forEach(item => {
      from(item.getDownloadURL())
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(url => {
          this.kmlLayerLinks.push(url);
        });
      this.isLoading = false;
    });
  }

  private openSignInDialog(): void {
    const dialogRef = this.dialog.open(GoogleSignInModalComponent, {width: '400px'});
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result || !result.sucessfulLogin) {
          this.openSignInDialog();
        } else {
          this.retrieveMapDataForDate(new Date());
        }
    });
  }

}

