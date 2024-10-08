import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { API_BASE_URL } from "src/api.config";

@Injectable({
  providedIn: "root",
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  public async register(citas: any): Promise<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    return await firstValueFrom(
      this.http.post(`${API_BASE_URL}/producto/register`, citas, {
        headers,
      })
    );
  }

  public async update(payload: any, id: string): Promise<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    return await firstValueFrom(
      this.http.put(`${API_BASE_URL}/producto/update/${id}`, payload, {
        headers,
      })
    );
  }

  public async delete(id: number): Promise<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    return await firstValueFrom(
      this.http.delete(`${API_BASE_URL}/producto/delete/${id}`, {
        headers,
      })
    );
  }

  public async all(page: number = 1, limit: number = 10) {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-access-token": token,
    });
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());
    const response = await firstValueFrom(
      this.http.get<any>(`${API_BASE_URL}/producto`, {
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
      this.http.get(`${API_BASE_URL}/producto/list`, {
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
