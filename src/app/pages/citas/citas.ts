import { Component, OnInit } from "@angular/core";
import { CitasService } from "./citas.service";
import { ICitas } from "src/shared/intefaces/citas.interface";

@Component({
  selector: "app-citas",
  templateUrl: "./citas.html",
  styleUrls: ["./citas.scss"],
})
export class CitasComponent implements OnInit {
  // Definicion de propiedades

  public pacienteCreado: boolean = false;
  public pacienteActualizado: boolean = false;
  public currentPage: number = 1;
  public totalPages: number;
  public totalPacientes: number;
  public citas: ICitas[] = [];
  public formularioPaciente: boolean = false;
  public botonCrearNuevoPaciente: boolean = true;
  public tablaPaciente: boolean = true;
  public cita: ICitas = {
    id: 0,
    paciente_id: 0,
    medico_id: 0,
    fecha: undefined,
    hora_entrada: "",
    hora_salida: "",
    nota: "",
    estado: "",
    delete: 0,
    createdAt: undefined,
    updatedAt: undefined,
  };
  public medicos: any[];
  public pacientes: any[];

  // Constructor
  constructor(private pacienteService: CitasService) {
    this.listadoCitas();
    this.listadoMedicos();
    this.listadoPacientes();
  }

  ngOnInit(): void {}

  public async registroCita() {
    try {
      console.log("CitaInterface", this.cita);
      this.cita.delete = 1;
      const data = await this.pacienteService.registroPacientes(this.cita);
      if (data) {
        this.citas.push({
          id: data.id,
          paciente_id: this.cita.paciente_id,
          medico_id: this.cita.medico_id,
          fecha: data.fecha,
          hora_entrada: this.cita.hora_entrada,
          hora_salida: this.cita.hora_salida,
          nota: this.cita.nota,
          estado: this.cita.estado,
          delete: 1,
          createdAt: undefined,
          updatedAt: undefined,
        });
      }
      this.pacienteCreado = true;
      this.ocultarAlerta();
      this.cita.id = data.id;
    } catch (error) {
      console.error("Error en el registro del usuario:", error);
    }
  }

  public async updateCita() {
    try {
      await this.pacienteService.actualizarPaciente(
        this.cita,
        this.cita.id.toString()
      );
      const indexCita = this.citas.findIndex(
        (item) => (item.id = this.cita.id)
      );
      const idCita = this.cita.id;
      this.cita[indexCita] = this.cita;
      this.pacienteActualizado = true;
      this.ocultarAlerta();
      this.cita.id = idCita;
    } catch (error) {
      throw error;
    }
  }

  public async eliminarPaciente(id: number) {
    try {
      if (confirm("¿Estás seguro de que deseas eliminar este paciente?")) {
        await this.pacienteService.eliminarPaciente(id);
        const findIndex = this.citas.findIndex((item) => (item.id = id));
        this.citas.splice(findIndex, 1);
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  cambiarPagina(page: number) {
    this.currentPage = page;
    this.listadoPacientes();
  }

  private async listadoCitas() {
    try {
      const data = await this.pacienteService.listadoCitas(
        Number(this.currentPage)
      );
      this.totalPacientes = data.totalPacientes;
      this.totalPages = data.totalPages;
      this.citas = data.pacientes;
      console.log("this.Pacientes", this.citas);
    } catch (error) {
      console.error("Error al obtener la lista de pacientes:", error);
    }
  }

  private async listadoMedicos() {
    try {
      const data = await this.pacienteService.listadoMedicos();
      this.medicos = data.medicos;
      console.log(this.medicos);
    } catch (error) {
      this.medicos = [];
    }
  }

  private async listadoPacientes() {
    try {
      const data = await this.pacienteService.listadoPacientes();
      this.pacientes = data.pacientes;
      console.log(this.pacientes);
    } catch (error) {
      this.pacientes = [];
    }
  }

  ocultarAlerta() {
    this.pacienteCreado = false;
    this.pacienteActualizado = false;
    this.formularioPaciente = false;
    this.botonCrearNuevoPaciente = true;
    this.tablaPaciente = true;
  }

  editarPaciente(citaEdit: ICitas) {
    this.cita = citaEdit;
    this.cita.medico_id = Number(citaEdit.medico_id);
    this.cita = citaEdit;
    this.cita.fecha = this.formattedDate();
    console.log(this.cita);
    this.formularioPaciente = true;
    this.botonCrearNuevoPaciente = false;
    this.tablaPaciente = false;
  }

  cancelarEdicion() {
    this.tablaPaciente = true;
    this.formularioPaciente = false;
    this.botonCrearNuevoPaciente = true;
    this.cita = {
      id: 0,
      paciente_id: 0,
      medico_id: 0,
      fecha: undefined,
      hora_entrada: "",
      hora_salida: "",
      nota: "",
      estado: "",
      delete: 0,
      createdAt: undefined,
      updatedAt: undefined,
    };
  }

  public formattedDate(): string {
    const dateParsed = new Date(this.cita.fecha);
    const year = dateParsed.getFullYear();
    const month = String(dateParsed.getMonth() + 1).padStart(2, "0");
    const day = String(dateParsed.getDate()).padStart(2, "0");
    const fecha = `${year}-${month}-${day}`;
    return fecha;
  }
}
