import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneListComponent } from './one-list.component';

describe('OnelistComponent', () => {
  let component: OneListComponent;
  let fixture: ComponentFixture<OneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
