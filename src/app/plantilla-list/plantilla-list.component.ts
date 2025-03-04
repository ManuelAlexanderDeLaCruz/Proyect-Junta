import { Component, OnInit } from '@angular/core';
import { Plantilla } from '../plantilla.model';
import { PlantillaService } from '../plantilla.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  selector: 'app-plantilla-list',
  templateUrl: './plantilla-list.component.html',
  styleUrls: ['./plantilla-list.component.css'],
})
export class PlantillaListComponent implements OnInit {
  plantillas: Plantilla[] = [];

  constructor(private plantillaService: PlantillaService) {}

  ngOnInit(): void {
    this.plantillaService.getPlantillas().subscribe((plantillas) => {
      this.plantillas = plantillas;
    });

    
  }

  deletePlantilla(id: number): void {
    this.plantillaService.deletePlantilla(id).subscribe(() => {
      this.plantillas = this.plantillas.filter(p => p.id !== id);
    });
  }
}
