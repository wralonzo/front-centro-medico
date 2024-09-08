import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { API_BASE_URL } from "src/api.config";

@Injectable({
  providedIn: "root",
})
export class CitasService {
  constructor(private http: HttpClient) {}

  public async registroPacientes(citas: any): Promise<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    return await firstValueFrom(
      this.http.post(`${API_BASE_URL}/cita/register`, citas, {
        headers,
      })
    );
  }

  public async actualizarPaciente(payload: any, id: string): Promise<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    return await firstValueFrom(
      this.http.put(`${API_BASE_URL}/cita/update/${id}`, payload, {
        headers,
      })
    );
  }

  public async eliminarPaciente(id: number): Promise<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    return await firstValueFrom(
      this.http.delete(`${API_BASE_URL}/cita/delete/${id}`, {
        headers,
      })
    );
  }

  public async listadoCitas(page: number = 1, limit: number = 10) {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());
    const response = await firstValueFrom(
      this.http.get<any>(`${API_BASE_URL}/cita`, {
        headers: headers,
        params: params,
      })
    );
    return response;
  }

  public async listadoMedicos(): Promise<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    const params = new HttpParams().set("page", "1").set("limit", "100");
    return await firstValueFrom(
      this.http.get(`${API_BASE_URL}/doctor/list`, {
        headers,
        params,
      })
    );
  }

  public async listadoPacientes(): Promise<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    const params = new HttpParams().set("page", "1").set("limit", "100");
    return await firstValueFrom(
      this.http.get(`${API_BASE_URL}/patient/list`, {
        headers,
        params,
      })
    );
  }
}
