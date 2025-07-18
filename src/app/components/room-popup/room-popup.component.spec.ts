import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPopupComponent } from './room-popup.component';

describe('RoomPopupComponent', () => {
  let component: RoomPopupComponent;
  let fixture: ComponentFixture<RoomPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
