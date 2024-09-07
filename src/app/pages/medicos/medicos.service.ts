import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  constructor(private http: HttpClient) { }

  registroMedicos(
    medico_id: number,
    especialidad_id: number
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.post(`${API_BASE_URL}/doctor/register`, {
      medico_id,
      especialidad_id
    }, {
      headers
    });
  }

  actualizarMedico(
    id: number,
    especialidad_id: number
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.put(`${API_BASE_URL}/doctor/update/${id}`, {
      especialidad_id,
    }, {
      headers
    });
  }

  eliminarMedico(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.delete(`${API_BASE_URL}/doctor/delete/${id}`, {
      headers
    });
  }

  listadoMedicos(page: number = 1, limit: number = 10): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${API_BASE_URL}/doctor/list`, {
      headers,
      params
    });
  }
}
