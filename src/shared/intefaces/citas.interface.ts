export interface ICitas {
  id: number;
  paciente_id: number;
  medico_id: number;
  fecha: string;
  hora_entrada: string;
  hora_salida: string;
  nota: string;
  estado: string;
  delete: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductos {
  id: number;
  nombre: string;
  precio: number;
  existencia: number;
  fechaVencimiento: string;
}
