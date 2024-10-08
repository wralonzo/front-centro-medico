import { Component, OnInit } from "@angular/core";
import { ProductoService } from "./producto.service";
import { IProductos } from "src/shared/intefaces/citas.interface";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.html",
  styleUrls: ["./producto.scss"],
})
export class ProductoComponent implements OnInit {
  // Definicion de propiedades

  public pacienteCreado: boolean = false;
  public pacienteActualizado: boolean = false;
  public currentPage: number = 1;
  public totalPages: number;
  public totalPacientes: number;
  public productos: IProductos[] = [];
  public formularioPaciente: boolean = false;
  public botonCrearNuevoPaciente: boolean = true;
  public tablaPaciente: boolean = true;
  public producto: IProductos = {
    id: 0,
    nombre: "",
    precio: 0,
    existencia: 0,
    fechaVencimiento: undefined,
  };

  // Constructor
  constructor(private service: ProductoService) {
    this.loadData();
  }

  ngOnInit(): void {}

  public async registroCita() {
    try {
      console.log("CitaInterface", this.producto);
      const data: IProductos = await this.service.register(this.producto);
      if (data) {
        this.productos.push({
          id: data.id,
          nombre: data.nombre,
          precio: data.precio,
          existencia: data.existencia,
          fechaVencimiento: data.fechaVencimiento,
        });
      }
      this.pacienteCreado = true;
      this.ocultarAlerta();
      this.producto.id = data.id;
    } catch (error) {
      console.error("Error en el registro del usuario:", error);
    }
  }

  public async updateCita() {
    try {
      await this.service.update(this.producto, this.producto.id.toString());
      const indexCita = this.productos.findIndex(
        (item) => (item.id = this.producto.id)
      );
      const idCita = this.producto.id;
      this.producto[indexCita] = this.producto;
      this.pacienteActualizado = true;
      this.ocultarAlerta();
      this.producto.id = idCita;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarPaciente(id: number) {
    try {
      if (confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
        await this.service.delete(id);
        const findIndex = this.productos.findIndex((item) => (item.id = id));
        this.productos.splice(findIndex, 1);
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  cambiarPagina(page: number) {
    this.currentPage = page;
    this.loadData();
  }

  private async loadData() {
    try {
      this.formularioPaciente = false;
      const data = await this.service.all(Number(this.currentPage));
      this.totalPacientes = data.totalPacientes;
      this.totalPages = data.totalPages;
      this.productos = data.pacientes;
      console.log("this.pacientes", this.productos);
    } catch (error) {
      console.error("Error al obtener la lista de pacientes:", error);
    }
  }

  ocultarAlerta() {
    this.pacienteCreado = false;
    this.pacienteActualizado = false;
    this.formularioPaciente = false;
    this.botonCrearNuevoPaciente = true;
    this.tablaPaciente = true;
  }

  editarPaciente(citaEdit: IProductos) {
    this.producto = citaEdit;
    this.producto.fechaVencimiento = this.formattedDate();
    console.log(this.producto);
    this.formularioPaciente = true;
    this.botonCrearNuevoPaciente = false;
    this.tablaPaciente = false;
  }

  cancelarEdicion() {
    this.tablaPaciente = true;
    this.formularioPaciente = false;
    this.botonCrearNuevoPaciente = true;
    this.producto = {
      id: 0,
      nombre: "",
      precio: 0,
      existencia: 0,
      fechaVencimiento: undefined,
    };
  }

  public formattedDate(): string {
    const dateParsed = new Date(this.producto.fechaVencimiento);
    const year = dateParsed.getFullYear();
    const month = String(dateParsed.getMonth() + 1).padStart(2, "0");
    const day = String(dateParsed.getDate()).padStart(2, "0");
    const fecha = `${year}-${month}-${day}`;
    return fecha;
  }
}
