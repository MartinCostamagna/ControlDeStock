import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';
import { CreateCategoria } from '../interfaces/createCategoria.interface';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly baseUrl = 'http://localhost:3000/categoria';

  constructor(private http: HttpClient) {}

  registrarCategoria(categoriaData: CreateCategoria): Observable<any> {
    return this.http.post(this.baseUrl, categoriaData);
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl);
  }

}