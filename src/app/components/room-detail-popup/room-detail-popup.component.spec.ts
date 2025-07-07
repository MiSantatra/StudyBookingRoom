import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailPopupComponent } from './room-detail-popup.component';

describe('RoomDetailPopupComponent', () => {
  let component: RoomDetailPopupComponent;
  let fixture: ComponentFixture<RoomDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetailPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
