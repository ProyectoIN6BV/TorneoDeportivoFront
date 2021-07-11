import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidosUserComponent } from './partidos-user.component';

describe('PartidosUserComponent', () => {
  let component: PartidosUserComponent;
  let fixture: ComponentFixture<PartidosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidosUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
