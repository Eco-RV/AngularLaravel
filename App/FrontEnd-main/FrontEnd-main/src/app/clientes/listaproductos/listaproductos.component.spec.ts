import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaproductosComponent } from './listaproductos.component';

describe('ListaproductosComponent', () => {
  let component: ListaproductosComponent;
  let fixture: ComponentFixture<ListaproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaproductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
