import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTorneoComponent } from './navbar-torneo.component';

describe('NavbarTorneoComponent', () => {
  let component: NavbarTorneoComponent;
  let fixture: ComponentFixture<NavbarTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarTorneoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
