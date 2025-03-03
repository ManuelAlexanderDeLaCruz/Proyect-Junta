import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plantilla } from './plantilla.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantillaService {
  private apiUrl = 'https://localhost:7186/api/plantillas';

  constructor(private http: HttpClient) {}

  getPlantillas(): Observable<Plantilla[]> {
    return this.http.get<Plantilla[]>(this.apiUrl);
  }

  getPlantilla(id: number): Observable<Plantilla> {
    return this.http.get<Plantilla>(`${this.apiUrl}/${id}`);
  }

  createPlantilla(plantilla: Plantilla): Observable<Plantilla> {
    return this.http.post<Plantilla>(this.apiUrl, plantilla);
  }

  updatePlantilla(plantilla: Plantilla): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${plantilla.id}`, plantilla);
  }

  deletePlantilla(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Nuevo método para guardar cartas
  guardarCarta(plantilla: Plantilla): Observable<any> {
    return this.http.post(`${this.apiUrl}/guardar-carta`, plantilla);
  }
}
