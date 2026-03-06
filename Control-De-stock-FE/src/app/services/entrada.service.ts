// src/app/services/entrada.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EntradaService {
    private apiUrl = 'http://localhost:3000/entrada';

    constructor(private http: HttpClient) { }

    registrarIngreso(payload: any): Observable<any> {
        return this.http.post(this.apiUrl, payload);
    }
}