import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from './especialidades.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {
  // Definicion de propiedades
  nombre: string;
  especialidadCreada: boolean = false;
  especialidadActualizada: boolean = false;
  currentPage: number = 1;
  totalPages: number;
  totalEspecialidades: number;
  especialidades: any[] = [];
  formularioEspecialidad: boolean = false;
  botonCrearNuevaEspecialidad: boolean = true;
  tablaEspecialidad: boolean = true;
  idEspecialidadEditar: number | null = null;

  // Constructor
  constructor(private especialidadService: EspecialidadesService) {
  }

  // Definciion de metodos
  ngOnInit(): void {
    this.listadoEspecialidadesPaginado();
  }

  registroEspecialidades(
    nombre: string
  ) {
    if (this.idEspecialidadEditar !== null) {
      this.actualizarEspecialidad(
        this.idEspecialidadEditar,
        nombre
      );
      this.limpiarCampos();
      this.ocultarAlerta();
    } else {
      this.especialidadService.registroEspecialidades(
        nombre
      ).subscribe(
        () => {
          this.especialidadCreada = true;
          this.limpiarCampos();
          this.ocultarAlerta()
        },
        (error) => {
          console.error('Error en el registro de la especialidad:', error);
        }
      )
    }
  }

  actualizarEspecialidad(
    id: number,
    nombre: string,
  ) {
    this.especialidadService.actualizarEspecialidad(
      id,
      nombre
    ).subscribe(
      () => {
        this.especialidadActualizada = true;
        this.listadoEspecialidadesPaginado();
      },
      (error) => {
        console.error('Error al actualizar la especialidad:', error);
      }
    );
  }

  eliminarEspecialidad(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta especialidad?')) {
      this.especialidadService.eliminarEspecialidad(id).subscribe(
        () => {
          this.listadoEspecialidadesPaginado();
        },
        (error) => {
          console.error('Error al eliminar la especialidad:', error);
        }
      );
    }
  }

  cambiarPagina(page: number) {
    this.currentPage = page;
    this.listadoEspecialidadesPaginado();
  }

  listadoEspecialidadesPaginado() {
    const currentPageNumbre = Number(this.currentPage);
    this.especialidadService.listadoEspecialidadesPaginado(currentPageNumbre).subscribe(
      (response) => {
        this.totalEspecialidades = response.totalEspecialidades;
        this.totalPages = response.totalPages;
        this.especialidades = response.especialidades;
      },
      (error) => {
        console.error('Error al obtener la lista de especialidades:', error);
      }
    );
  }

  limpiarCampos() {
    this.nombre = '';
  }

  ocultarAlerta() {
    setTimeout(() => {
      this.especialidadCreada = false;
      this.especialidadActualizada = false;
      this.formularioEspecialidad = false;
      this.botonCrearNuevaEspecialidad = true;
      this.tablaEspecialidad = true;
      this.listadoEspecialidadesPaginado();
    }, 5000);
  }

  editarEspecialidad(especialidad: any) {
    this.idEspecialidadEditar = especialidad.id;
    this.nombre = especialidad.nombre;
    this.formularioEspecialidad = true;
    this.botonCrearNuevaEspecialidad = false;
    this.tablaEspecialidad = false;
  }

  cancelarEdicion() {
    this.idEspecialidadEditar = null;
    this.limpiarCampos();
    this.formularioEspecialidad = false;
    this.botonCrearNuevaEspecialidad = true;
    this.tablaEspecialidad = true;
  }
}
