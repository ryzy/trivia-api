import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxImageApiComponent } from './ngx-image-api.component';

describe('NgxImageApiComponent', () => {
  let component: NgxImageApiComponent;
  let fixture: ComponentFixture<NgxImageApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxImageApiComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxImageApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
