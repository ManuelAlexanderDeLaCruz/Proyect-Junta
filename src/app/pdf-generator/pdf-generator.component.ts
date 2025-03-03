import { Component, OnInit } from '@angular/core';
import { Plantilla } from '../plantilla.model';
import { PlantillaService } from '../plantilla.service';
import * as Handlebars from 'handlebars'; 
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-pdf-generator',
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.css']
})
export class PdfGeneratorComponent implements OnInit {
  plantillas: Plantilla[] = [];
  selectedPlantillaId: number | null = null;
  contextJson: string = '{}';
  errorMessage: string | null = null;

  constructor(private plantillaService: PlantillaService) {}

  ngOnInit(): void {
    this.plantillaService.getPlantillas().subscribe((plantillas) => {
      this.plantillas = plantillas;
    });
  }

  generarPdf(): void {
    this.errorMessage = null;

    if (!this.selectedPlantillaId) {
      this.errorMessage = 'Por favor, seleccione una plantilla.';
      return;
    }

    let context;
    try {
      context = JSON.parse(this.contextJson);
    } catch (e) {
      this.errorMessage = 'Datos de contexto JSON inválidos.';
      return;
    }

    const selectedPlantilla = this.plantillas.find(p => p.id === this.selectedPlantillaId);

    if (!selectedPlantilla) {
      this.errorMessage = 'Plantilla no encontrada.';
      return;
    }

    this.generarPdfConHandlebars(selectedPlantilla, context);
  }

  generarPdfConHandlebars(plantilla: Plantilla, context: any): void {
    try {
      
      const template = Handlebars.compile(plantilla.contenido);

      
      const compiledHtml = template(context);

      
      import('jspdf').then(jspdf => {
        const jsPDFInstance = new jspdf.default();
        jsPDFInstance.html(compiledHtml, {
          callback: (doc) => {
            doc.save(`${plantilla.nombre}.pdf`);
          },
          x: 10,
          y: 10,
          width: 170, 
          windowWidth: 650 
        });
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      this.errorMessage = 'Error al generar el PDF.';
    }
  }
}