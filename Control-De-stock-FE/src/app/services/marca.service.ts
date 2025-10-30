import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateMarca } from '../interfaces/createMarca.interface';
import { Marca } from '../interfaces/marca.interface';

@Injectable({ providedIn: 'root' })
export class MarcaService {
  private readonly baseUrl = 'http://localhost:3000/marca'; 
  
  constructor(private http: HttpClient) {}

  registrarMarca(marcaData: CreateMarca): Observable<any> {
    return this.http.post(this.baseUrl,marcaData);
  }

  obtenerMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.baseUrl); 
  }
}