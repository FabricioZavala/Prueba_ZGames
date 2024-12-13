import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsEventsComponent } from './sports-events.component';

describe('SportsEventsComponent', () => {
  let component: SportsEventsComponent;
  let fixture: ComponentFixture<SportsEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportsEventsComponent]
    });
    fixture = TestBed.createComponent(SportsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
