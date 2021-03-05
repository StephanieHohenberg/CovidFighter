import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormularNonTestedComponent } from './upload-formular-non-tested.component';

describe('UploadFormularComponent', () => {
  let component: UploadFormularNonTestedComponent;
  let fixture: ComponentFixture<UploadFormularNonTestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFormularNonTestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormularNonTestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
