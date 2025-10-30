import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../interfaces/provincia.interface';

@Injectable({ providedIn: 'root' })
export class ProvinciaService {
    private readonly baseUrl = 'http://localhost:3000/provincia';

    constructor(private http: HttpClient) { }

    obtenerPorPais(idPais: number): Observable<Provincia[]> {
        return this.http.get<Provincia[]>(`${this.baseUrl}/by-pais/${idPais}`);
    }
}