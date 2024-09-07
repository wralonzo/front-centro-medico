import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/api.config';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient) { }

  registroPacientes(
    nombre: string,
    apellido: string,
    direccion: string,
    telefono: string,
    fecha_nacimiento: string,
    dpi: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.post(`${API_BASE_URL}/patient/register`, {
      nombre,
      apellido,
      direccion,
      telefono,
      fecha_nacimiento,
      dpi
    }, {
      headers
    });
  }

  actualizarPaciente(
    id: number,
    nombre: string,
    apellido: string,
    direccion: string,
    telefono: string,
    fecha_nacimiento: string,
    dpi: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.put(`${API_BASE_URL}/patient/update/${id}`, {
      nombre,
      apellido,
      direccion,
      telefono,
      fecha_nacimiento,
      dpi
    }, {
      headers
    });
  }

  eliminarPaciente(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.delete(`${API_BASE_URL}/patient/delete/${id}`, {
      headers
    });
  }

  listadoPacientes(page: number = 1, limit: number = 10): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${API_BASE_URL}/patient/list`, {
      headers,
      params
    });
  }
}
