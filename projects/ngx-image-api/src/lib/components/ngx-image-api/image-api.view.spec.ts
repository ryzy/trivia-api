import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageApiView } from './image-api.view';

describe('ImageApiView', () => {
  let component: ImageApiView;
  let fixture: ComponentFixture<ImageApiView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageApiView],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageApiView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
