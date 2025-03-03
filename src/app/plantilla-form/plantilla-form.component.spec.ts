import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFormComponent } from './plantilla-form.component';

describe('PlantillaFormComponent', () => {
  let component: PlantillaFormComponent;
  let fixture: ComponentFixture<PlantillaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
