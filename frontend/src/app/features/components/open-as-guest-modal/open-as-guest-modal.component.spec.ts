import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAsGuestModalComponent } from './open-as-guest-modal.component';

describe('OpenAsGuestModalComponent', () => {
  let component: OpenAsGuestModalComponent;
  let fixture: ComponentFixture<OpenAsGuestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenAsGuestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenAsGuestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
