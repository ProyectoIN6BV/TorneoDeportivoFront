import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoInicioUserComponent } from './torneo-inicio-user.component';

describe('TorneoInicioUserComponent', () => {
  let component: TorneoInicioUserComponent;
  let fixture: ComponentFixture<TorneoInicioUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorneoInicioUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneoInicioUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
