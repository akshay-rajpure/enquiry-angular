import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEnquiryComponent } from './main-enquiry.component';

describe('MainEnquiryComponent', () => {
  let component: MainEnquiryComponent;
  let fixture: ComponentFixture<MainEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
