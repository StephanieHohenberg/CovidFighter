import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSignInModalComponent } from './google-sign-in-modal.component';

describe('GoogleSignInModalComponent', () => {
  let component: GoogleSignInModalComponent;
  let fixture: ComponentFixture<GoogleSignInModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleSignInModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSignInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
