import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Categoria} from "../models/categoria";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8081/categoria';
  private categoriasSubject = new BehaviorSubject<Categoria[]>([]);
  categorias$ = this.categoriasSubject.asObservable(); // Publicamos el observable

  constructor(private http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  guardar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  actualizar(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  obtenerPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  findAll(): void {
    this.listar().subscribe(categorias => {
      this.categoriasSubject.next(categorias);  // Actualizamos el Subject con las nuevas categorías
    });
  }

}
