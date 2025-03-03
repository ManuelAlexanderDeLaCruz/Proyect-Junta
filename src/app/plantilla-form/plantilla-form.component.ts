import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlantillaService } from '../plantilla.service';
import { Plantilla } from '../plantilla.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ ReactiveFormsModule ],
  selector: 'app-plantilla-form',
  templateUrl: './plantilla-form.component.html',
  styleUrls: ['./plantilla-form.component.css'],
})
export class PlantillaFormComponent implements OnInit {
  plantillaForm: FormGroup;
  plantillaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private plantillaService: PlantillaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.plantillaForm = this.fb.group({
      nombre: ['', Validators.required],
      contenido: ['', Validators.required],
      descripcion: [''],
      tipo: [''],
      version: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.plantillaId = params['id'];
      if (this.plantillaId) {
        this.plantillaService.getPlantilla(this.plantillaId).subscribe((plantilla) => {
          this.plantillaForm.patchValue(plantilla);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.plantillaForm.valid) {
      const plantilla: Plantilla = {
        id: this.plantillaId || 0,
        ...this.plantillaForm.value,
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
      };
      if (this.plantillaId) {
        this.plantillaService.updatePlantilla(plantilla).subscribe(() => {
          this.router.navigate(['/plantillas']);
        });
      } else {
        this.plantillaService.createPlantilla(plantilla).subscribe(() => {
          this.router.navigate(['/plantillas']);
        });
      }
    }
  }
}