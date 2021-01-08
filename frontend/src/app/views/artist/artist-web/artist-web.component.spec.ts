import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistWebComponent } from './artist-web.component';

describe('ArtistWebComponent', () => {
  let component: ArtistWebComponent;
  let fixture: ComponentFixture<ArtistWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
