import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormularComponent } from './upload-formular.component';

describe('UploadFormularComponent', () => {
  let component: UploadFormularComponent;
  let fixture: ComponentFixture<UploadFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
