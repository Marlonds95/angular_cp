import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:3000/libros'; 

  constructor(private http: HttpClient) { }

  
  getLibros(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  
  getLibro(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  getBestSellers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(libros => libros.filter(libro => libro.bestSeller))
    );
  }
  
  agregarLibro(libro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, libro);
  }

  
  actualizarLibro(id: number, libro: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, libro);
  }

  
  eliminarLibro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
}
