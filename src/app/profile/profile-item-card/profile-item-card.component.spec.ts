import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileItemCardComponent } from './profile-item-card.component';

describe('ProfileItemCardComponent', () => {
  let component: ProfileItemCardComponent;
  let fixture: ComponentFixture<ProfileItemCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileItemCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
