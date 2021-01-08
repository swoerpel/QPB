import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularityIndicatorComponent } from './popularity-indicator.component';

describe('PopularityIndicatorComponent', () => {
  let component: PopularityIndicatorComponent;
  let fixture: ComponentFixture<PopularityIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularityIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularityIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
