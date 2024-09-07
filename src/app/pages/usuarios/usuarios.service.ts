import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_BASE_URL } from "../../../api.config";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {
  }

  registroUsuarios(
    nombre: string,
    apellido: string,
    direccion: string,
    telefono: string,
    fecha_nacimiento: string,
    dpi: string,
    correo_electronico: string,
    contrasenia: string,
    rol: string
  ): Observable<any> {
    return this.http.post(`${API_BASE_URL}/user/register`, {
      nombre,
      apellido,
      direccion,
      telefono,
      fecha_nacimiento,
      dpi,
      correo_electronico,
      contrasenia,
      rol
    });
  }

  actualizarUsuario(
    id: number,
    nombre: string,
    apellido: string,
    direccion: string,
    telefono: string,
    fecha_nacimiento: string,
    dpi: string,
    correo_electronico: string,
    contrasenia: string,
    rol: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.put(`${API_BASE_URL}/user/update/${id}`, {
      nombre,
      apellido,
      direccion,
      telefono,
      fecha_nacimiento,
      dpi,
      correo_electronico,
      contrasenia,
      rol
    }, {
      headers
    });
  }

  eliminarUsuario(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.delete(`${API_BASE_URL}/user/delete/${id}`, {
      headers
    });
  }

  listadoUsuarios(page: number = 1, limit: number = 10): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${API_BASE_URL}/user/list`, {
      headers,
      params
    });
  }

  listarUsuariosRolMedico(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.get(`${API_BASE_URL}/user/list-all-rol-doctor`, {
      headers,
    });
  }
}
