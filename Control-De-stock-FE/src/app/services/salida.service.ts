// src/app/services/salida.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SalidaService {
    private apiUrl = 'http://localhost:3000/salida';

    constructor(private http: HttpClient) { }

    registrarSalida(payload: any): Observable<any> {
        return this.http.post(this.apiUrl, payload);
    }
}