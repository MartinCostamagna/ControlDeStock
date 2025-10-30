import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({ providedIn: 'root' })
export class PaisService {
    private readonly baseUrl = 'http://localhost:3000/pais';

    constructor(private http: HttpClient) { }

    obtenerPaises(): Observable<Pais[]> {
        return this.http.get<Pais[]>(this.baseUrl);
    }
}