import {Component, Input, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-date-stepper',
  templateUrl: './date-stepper.component.html',
  styleUrls: ['./date-stepper.component.css']
})
export class DateStepperComponent implements OnInit {

  @Output() public dateHasChanged = new EventEmitter<Date>();
  @Input() public isDisabled = false;
  @Input() public steps: number[] = [];
  public lastWeek: Date[] = [];
  private today: Date;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
    this.lastWeek = this.getDatesForLastTwoWeeks(this.today);
  }

  public getLabelForDate(date: Date): string {
    if (date === this.today) {
      return this.translateService.instant('STEPPER.TODAY');
    } else {
      return date.toLocaleDateString();
    }
  }

  private getDatesForLastTwoWeeks(today: Date): Date[] {
    const week: Date[] = [];
    week.push(today);
    this.steps.forEach(step => {
      const prevDate = new Date(today);
      prevDate.setHours(0, 0, 0, 0);
      prevDate.setDate(today.getDate() - step);
      week.push(prevDate);
    });
    return week;
  }

}
