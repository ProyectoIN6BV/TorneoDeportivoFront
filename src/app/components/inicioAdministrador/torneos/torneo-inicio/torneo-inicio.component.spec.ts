import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneoInicioComponent } from './torneo-inicio.component';

describe('TorneoInicioComponent', () => {
  let component: TorneoInicioComponent;
  let fixture: ComponentFixture<TorneoInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorneoInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TorneoInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
