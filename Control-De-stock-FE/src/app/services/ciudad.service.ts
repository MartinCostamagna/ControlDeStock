import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../interfaces/ciudad.interface';

@Injectable({ providedIn: 'root' })
export class CiudadService {
    private readonly baseUrl = 'http://localhost:3000/ciudad';

    constructor(private http: HttpClient) { }

    obtenerPorProvincia(idProvincia: number): Observable<Ciudad[]> {
        return this.http.get<Ciudad[]>(`${this.baseUrl}/by-provincia/${idProvincia}`);
    }
}