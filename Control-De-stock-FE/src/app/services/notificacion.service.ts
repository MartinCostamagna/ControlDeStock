import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion } from '../interfaces/notificacion.interface';

@Injectable({
    providedIn: 'root'
})
export class NotificacionService {
    private apiUrl = 'http://localhost:3000/notificaciones';

    constructor(private http: HttpClient) { }

    getNotificaciones(): Observable<Notificacion[]> {
        return this.http.get<Notificacion[]>(this.apiUrl);
    }

    marcarComoVista(id: number): Observable<Notificacion> {
        return this.http.patch<Notificacion>(`${this.apiUrl}/${id}/vista`, {});
    }

    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}