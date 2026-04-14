// src/app/services/venta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VentaService {
    private apiUrl = 'http://localhost:3000/venta';

    constructor(private http: HttpClient) { }

    registrarVenta(venta: any): Observable<any> {
        return this.http.post(this.apiUrl, venta);
    }

    obtenerVentas(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}