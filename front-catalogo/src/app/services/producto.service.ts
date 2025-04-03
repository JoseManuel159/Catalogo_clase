import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Categoria} from "../models/categoria";
import {Producto} from "../models/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8081/productos';  // Asegúrate de que la URL sea correcta
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();  // Publicamos el observable

  constructor(private http: HttpClient) {}

  // Listar productos
  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Guardar producto
  guardar(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  guardarConImagen(formData: FormData): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, formData);
  }


  // Actualizar producto
  editar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  // Obtener producto por ID
  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Eliminar producto
  eliminar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  // Buscar producto por código
  buscarPorCodigo(codigo: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/buscar/${codigo}`);
  }

  // Buscar productos por nombre
  buscarPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar/nombre/${nombre}`);
  }

  // Buscar productos por rango de fecha
  buscarPorRangoFecha(startDate: string, endDate: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar/fecha/rango?startDate=${startDate}&endDate=${endDate}`);
  }

  buscarPorMes(mes: number, anio: number): Observable<Producto[]> {
    // Crear las fechas de inicio y fin del mes seleccionado
    const startDate = `${anio}-${mes.toString().padStart(2, '0')}-01`;
    const endDate = new Date(anio, mes, 0).toISOString().split('T')[0]; // Último día del mes

    return this.buscarPorRangoFecha(startDate, endDate);
  }


  // Buscar productos por categoría
  buscarPorCategoria(categoriaId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscarPorCategoria/${categoriaId}`);
  }

  // Función para actualizar el Subject con los nuevos productos
  findAll(): void {
    this.listar().subscribe(productos => {
      this.productosSubject.next(productos);  // Actualizamos el Subject con los nuevos productos
    });
  }
}
