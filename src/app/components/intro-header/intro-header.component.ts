import {Component, Input, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-intro-header',
  templateUrl: './intro-header.component.html',
  styleUrls: ['./intro-header.component.css']
})
export class IntroHeaderComponent implements OnInit {

  @Input() public geolocationActivated = false;
  @Input() public supportedGeolocation = false;
  public reply = -1;

  constructor() { }

  public ngOnInit(): void {
  }

  public selectionChanged(): void {

  }

  public getTodaysGoogleTimelineLink(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `https://www.google.com/maps/timeline?pb=!1m2!1m1!1s${year}-${month}-${day}`;
  }

}
