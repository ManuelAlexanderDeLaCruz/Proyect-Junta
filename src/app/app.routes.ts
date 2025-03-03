import { Routes } from '@angular/router';
import { PlantillaListComponent } from './plantilla-list/plantilla-list.component';
import { PlantillaFormComponent } from './plantilla-form/plantilla-form.component';
import { PdfGeneratorComponent } from './pdf-generator/pdf-generator.component';
import { CartaComponent } from './carta/carta.component';

export const routes: Routes = [
 
  {path: 'plantilla-list', component: PlantillaListComponent},
  {path: 'carta', component: CartaComponent},
  {path: 'pdf-generador', component: PdfGeneratorComponent},
  { path: '', redirectTo: '/plantilla-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/plantilla-list' },


];
 