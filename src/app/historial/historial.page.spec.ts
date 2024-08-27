import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Historialpage } from './historial.page';

describe('RegistrarPage', () => {
  let component: Historialpage;
  let fixture: ComponentFixture<Historialpage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Historialpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
