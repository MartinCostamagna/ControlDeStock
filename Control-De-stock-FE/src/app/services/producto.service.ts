import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';
import { CreateProducto } from '../interfaces/createProducto.interface';

@Injectable({ providedIn: 'root' })
export class ProductoService {
    private readonly baseUrl = 'http://localhost:3000/producto';

    constructor(private http: HttpClient) { }

    registrarProducto(productoData: CreateProducto): Observable<any> {
        return this.http.post(this.baseUrl, productoData);
    }

    obtenerProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.baseUrl);
    }
}