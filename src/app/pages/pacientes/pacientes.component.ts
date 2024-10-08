import { Component, OnInit } from "@angular/core";
import { PacientesService } from "./pacientes.service";
import { API_BASE_URL } from "src/api.config";

@Component({
  selector: "app-pacientes",
  templateUrl: "./pacientes.component.html",
  styleUrls: ["./pacientes.component.scss"],
})
export class PacientesComponent implements OnInit {
  // Definicion de propiedades
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  fecha_nacimiento: string;
  dpi: string;
  pacienteCreado: boolean = false;
  pacienteActualizado: boolean = false;
  currentPage: number = 1;
  totalPages: number;
  totalPacientes: number;
  pacientes: any[] = [];
  formularioPaciente: boolean = false;
  botonCrearNuevoPaciente: boolean = true;
  tablaPaciente: boolean = true;
  idPacienteEditar: number | null = null;

  // Constructor
  constructor(private pacienteService: PacientesService) {}

  // Definciion de metodos
  ngOnInit(): void {
    this.listadoPacientes();
  }

  navigateOpenBlank(id: number) {
    const urlPdf = `${API_BASE_URL}/cita/paciente/pdf/${id}`;
    window.open(urlPdf, '_blank');
  }
  registroPaciente(
    nombre: string,
    apellido: string,
    direccion: string,
    telefono: string,
    fecha_nacimiento: string,
    dpi: string
  ) {
    if (this.idPacienteEditar !== null) {
      this.actualizarPaciente(
        this.idPacienteEditar,
        nombre,
        apellido,
        direccion,
        telefono,
        fecha_nacimiento,
        dpi
      );
      this.limpiarCampos();
      this.ocultarAlerta();
    } else {
      this.pacienteService
        .registroPacientes(
          nombre,
          apellido,
          direccion,
          telefono,
          fecha_nacimiento,
          dpi
        )
        .subscribe(
          () => {
            this.pacienteCreado = true;
            this.limpiarCampos();
            this.ocultarAlerta();
          },
          (error) => {
            console.error("Error en el registro del usuario:", error);
          }
        );
    }
  }

  actualizarPaciente(
    id: number,
    nombre: string,
    apellido: string,
    direccion: string,
    telefono: string,
    fecha_nacimiento: string,
    dpi: string
  ) {
    this.pacienteService
      .actualizarPaciente(
        id,
        nombre,
        apellido,
        direccion,
        telefono,
        fecha_nacimiento,
        dpi
      )
      .subscribe(
        () => {
          this.pacienteActualizado = true;
          this.listadoPacientes();
        },
        (error) => {
          console.error("Error al actualizar el paciente:", error);
        }
      );
  }

  eliminarPaciente(id: number) {
    if (confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
      this.pacienteService.eliminarPaciente(id).subscribe(
        () => {
          this.listadoPacientes();
        },
        (error) => {
          console.error("Error al eliminar el paciente:", error);
        }
      );
    }
  }

  cambiarPagina(page: number) {
    this.currentPage = page;
    this.listadoPacientes();
  }

  listadoPacientes() {
    const currentPageNumbre = Number(this.currentPage);
    this.pacienteService.listadoPacientes(currentPageNumbre).subscribe(
      (response) => {
        this.totalPacientes = response.totalPacientes;
        this.totalPages = response.totalPages;
        this.pacientes = response.pacientes;
      },
      (error) => {
        console.error("Error al obtener la lista de pacientes:", error);
      }
    );
  }

  limpiarCampos() {
    this.nombre = "";
    this.apellido = "";
    this.direccion = "";
    this.telefono = "";
    this.fecha_nacimiento = "";
    this.dpi = "";
  }

  ocultarAlerta() {
    setTimeout(() => {
      this.pacienteCreado = false;
      this.pacienteActualizado = false;
      this.formularioPaciente = false;
      this.botonCrearNuevoPaciente = true;
      this.tablaPaciente = true;
      this.listadoPacientes();
    }, 5000);
  }

  editarPaciente(paciente: any) {
    this.idPacienteEditar = paciente.id;
    this.nombre = paciente.nombre;
    this.apellido = paciente.apellido;
    this.direccion = paciente.direccion;
    this.telefono = paciente.telefono;
    this.fecha_nacimiento = paciente.fecha_nacimiento;
    this.dpi = paciente.dpi;
    this.formularioPaciente = true;
    this.botonCrearNuevoPaciente = false;
    this.tablaPaciente = false;
  }

  cancelarEdicion() {
    this.idPacienteEditar = null;
    this.limpiarCampos();
    this.formularioPaciente = false;
    this.botonCrearNuevoPaciente = true;
    this.tablaPaciente = true;
  }
}
