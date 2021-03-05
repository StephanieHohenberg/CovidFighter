import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() public showUnsupportedGeoDataErrorMessage = false;
  @Input() public kmlLayerLinks: string[] = [];
  @Input() public isLoading: boolean;
  public lat;
  public lng;

  constructor() { }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  public hasError(): boolean {
    return this.showUndefinedGeoDataErrorMessage() || this.showUnsupportedGeoDataErrorMessage;
  }

  public hasNoData(): boolean {
    return !this.hasError() && !this.isLoading && this.kmlLayerLinks.length === 0;
  }

  public showUndefinedGeoDataErrorMessage(): boolean {
    return !this.lat || !this.lng;
  }
}
