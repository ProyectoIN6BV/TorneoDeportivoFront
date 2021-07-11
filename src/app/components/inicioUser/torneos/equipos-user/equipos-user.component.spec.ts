import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposUserComponent } from './equipos-user.component';

describe('EquiposUserComponent', () => {
  let component: EquiposUserComponent;
  let fixture: ComponentFixture<EquiposUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquiposUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
