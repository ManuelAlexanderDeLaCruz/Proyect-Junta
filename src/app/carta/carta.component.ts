import { Component, OnInit } from '@angular/core';
import { Plantilla } from '../plantilla.model';
import { PlantillaService } from '../plantilla.service';
import * as Handlebars from 'handlebars';
import jsPDF from 'jspdf';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  plantillas: Plantilla[] = [];
  selectedPlantillaId: number | null = null;
  context: any = {
    destinatario: '',
    cargoDestinatario: '',
    empresaDestinatario: '',
    direccionDestinatario: '',
    ciudadDestinatario: '',
    remitente: '',
    direccionRemitente: '',
    emailRemitente: '',
    telefonoRemitente: '',
    fecha: '',
    fechaDescriptiva: '',
    contenido: '',
    observaciones: '' 
  };
  errorMessage: string | null = null;

  constructor(private plantillaService: PlantillaService) { }

  ngOnInit(): void {
    this.plantillaService.getPlantillas().subscribe((plantillas) => {
      this.plantillas = plantillas;


      if (this.plantillas.length > 0) {
        this.selectedPlantillaId = this.plantillas[0].id;
        this.seleccionarPlantilla();
      }
    });
  }

  seleccionarPlantilla(): void {
    if (!this.selectedPlantillaId) return;

    const plantillaSeleccionada = this.plantillas.find(p => p.id === this.selectedPlantillaId);

    if (plantillaSeleccionada) {
      console.log("Plantilla seleccionada:", plantillaSeleccionada);


      this.context.fechaDescriptiva = this.context.fechaDescriptiva || new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      this.context.contenido = this.context.contenido || '';
      this.context.remitente = this.context.remitente || '';
      this.context.cargoDestinatario = this.context.cargoDestinatario || '';
      this.context.empresaDestinatario = this.context.empresaDestinatario || '';
      this.context.direccionDestinatario = this.context.direccionDestinatario || '';
      this.context.ciudadDestinatario = this.context.ciudadDestinatario || '';
      this.context.direccionRemitente = this.context.direccionRemitente || '';
      this.context.emailRemitente = this.context.emailRemitente || '';
      this.context.telefonoRemitente = this.context.telefonoRemitente || '';
      this.context.observaciones = this.context.observaciones || 'Sin observaciones.';

     

    }
  }

  generarCarta(): void {
    this.errorMessage = null;

    if (!this.selectedPlantillaId) {
      this.errorMessage = 'Por favor, seleccione una plantilla.';
      return;
    }

    const PlantillaId = Number(this.selectedPlantillaId); 
    const selectedPlantilla = this.plantillas.find(p => p.id === PlantillaId);

    if (!selectedPlantilla) {
      this.errorMessage = 'Plantilla no encontrada.';
      console.log("Error: No se encontró la plantilla con ID:", PlantillaId);
      console.log("Lista de plantillas disponibles:", this.plantillas);
      return;
    }


    const fechaISO = new Date().toISOString().split('T')[0];
    this.context.fecha = fechaISO;
    this.context.fechaDescriptiva = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    console.log("Contexto antes de compilar Handlebars:", JSON.stringify(this.context, null, 2));

    console.log("Contexto antes de compilar:", this.context); 
    const template = Handlebars.compile(selectedPlantilla.contenido);
    const compiledHtml = template(this.context);
    console.log("HTML compilado por Handlebars:", compiledHtml);

    console.log("HTML compilado:", compiledHtml);


    const doc = new jsPDF();
    doc.html(compiledHtml, {
      callback: (doc) => {
        doc.save(`carta_${this.context.remitente}.pdf`);
      },
      x: 10,
      y: 10,
      width: 170,
      windowWidth: 650,
    });
  }
}
