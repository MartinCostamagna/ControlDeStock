import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProveedor } from '../interfaces/createProveedor.interface';
import { Proveedor } from '../interfaces/proveedor.interface';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private readonly baseUrl = 'http://localhost:3000/proveedor';

  constructor(private http: HttpClient) { }

  registrarProveedor(proveedorData: CreateProveedor): Observable<any> {
    return this.http.post(this.baseUrl, proveedorData);
  }

  obtenerProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.baseUrl);
  }

  editarProveedor(id: number, proveedorData: CreateProveedor): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, proveedorData);
  }

  obtenerProveedorPorId(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.baseUrl}/${id}`);
  }
}