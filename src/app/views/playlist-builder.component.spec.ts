import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistBuilderComponent } from './playlist-builder.component';

describe('PlaylistBuilderComponent', () => {
  let component: PlaylistBuilderComponent;
  let fixture: ComponentFixture<PlaylistBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
