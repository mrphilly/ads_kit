import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceServiceComponentComponent } from './annonce-service-component.component';

describe('AnnonceServiceComponentComponent', () => {
  let component: AnnonceServiceComponentComponent;
  let fixture: ComponentFixture<AnnonceServiceComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceServiceComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceServiceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
