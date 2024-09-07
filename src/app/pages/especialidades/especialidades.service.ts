import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  constructor(private http: HttpClient) { }

  registroEspecialidades(
    nombre: string,
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.post(`${API_BASE_URL}/specialty/register`, {
      nombre,
    }, {
      headers
    });
  }

  actualizarEspecialidad(
    id: number,
    nombre: string,
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.put(`${API_BASE_URL}/specialty/update/${id}`, {
      nombre,
    }, {
      headers
    });
  }

  eliminarEspecialidad(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.delete(`${API_BASE_URL}/specialty/delete/${id}`, {
      headers
    });
  }

  listadoEspecialidadesPaginado(page: number = 1, limit: number = 10): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${API_BASE_URL}/specialty/list`, {
      headers,
      params
    });
  }

  listarEspecialidades(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    })
    return this.http.get(`${API_BASE_URL}/specialty/list-all`, {
      headers
    });
  }
}
