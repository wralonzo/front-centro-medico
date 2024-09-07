import { Component, OnInit } from '@angular/core';
import { MedicosService } from './medicos.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { EspecialidadesService } from '../especialidades/especialidades.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  // Definicion de propiedades
  medico_id: number;
  especialidad_id: number;
  medicoCreado: boolean = false;
  medicoActualizado: boolean = false;
  seEstaActualizando: boolean = false;
  currentPage: number = 1;
  totalPages: number;
  totalMedicos: number;
  medicos: any[] = [];
  usuariosRolMedico: any[] = [];
  especialidades: any[] = [];
  formularioMedico: boolean = false;
  botonCrearNuevoMedico: boolean = true;
  tablaMedico: boolean = true;
  idMedicoEditar: number | null = null;

  // Constructor
  constructor(
    private medicoService: MedicosService,
    private usuarioService: UsuariosService,
    private especialidadService: EspecialidadesService
  ) {
  }

  // Definciion de metodos
  ngOnInit(): void {
    this.listadoMedicos();
    this.listarUsuariosRolMedico();
    this.listarEspecialidades();
  }

  registroMedicos(
    medico_id: number,
    especialidad_id: number
  ) {
    if (this.idMedicoEditar !== null) {
      this.actualizarMedico(
        this.idMedicoEditar,
        especialidad_id
      );
      this.limpiarCampos();
      this.ocultarAlerta();
    } else {
      this.medicoService.registroMedicos(
        medico_id,
        especialidad_id
      ).subscribe(
        () => {
          this.medicoCreado = true;
          this.limpiarCampos();
          this.ocultarAlerta()
        },
        (error) => {
          console.error('Error en el registro del medico:', error);
        }
      )
    }
  }

  actualizarMedico(
    id: number,
    especialidad_id: number,
  ) {
    this.medicoService.actualizarMedico(
      id,
      especialidad_id
    ).subscribe(
      () => {
        this.medicoActualizado = true;
        this.listadoMedicos();
      },
      (error) => {
        console.error('Error al actualizar el medico:', error);
      }
    );
  }

  eliminarMedico(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este medico?')) {
      this.medicoService.eliminarMedico(id).subscribe(
        () => {
          this.listadoMedicos();
        },
        (error) => {
          console.error('Error al eliminar el medico:', error);
        }
      );
    }
  }

  cambiarPagina(page: number) {
    this.currentPage = page;
    this.listadoMedicos();
  }

  listadoMedicos() {
    const currentPageNumbre = Number(this.currentPage);
    this.medicoService.listadoMedicos(currentPageNumbre).subscribe(
      (response) => {
        this.totalMedicos = response.totalMedicos;
        this.totalPages = response.totalPages;
        this.medicos = response.medicos;
      },
      (error) => {
        console.error('Error al obtener la lista de medicos:', error);
      }
    );
  }

  listarUsuariosRolMedico() {
    this.usuarioService.listarUsuariosRolMedico().subscribe(
      (response) => {
        this.usuariosRolMedico = response;
        console.log(this.usuariosRolMedico);
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios con rol de medico:', error);
      }
    );
  }

  listarEspecialidades() {
    this.especialidadService.listarEspecialidades().subscribe(
      (response) => {
        this.especialidades = response;
        console.log(this.especialidades);
      },
      (error) => {
        console.error('Error al obtener la lista de especialidades:', error);
      }
    );
  }

  limpiarCampos() {
    this.medico_id = null;
    this.especialidad_id = null;
  }

  ocultarAlerta() {
    setTimeout(() => {
      this.medicoCreado = false;
      this.medicoActualizado = false;
      this.formularioMedico = false;
      this.botonCrearNuevoMedico = true;
      this.tablaMedico = true;
      this.listadoMedicos();
    }, 5000);
  }

  editarMedico(medico: any) {
    this.idMedicoEditar = medico.id;
    this.medico_id = medico.medico_id;
    this.especialidad_id = medico.especialidad_id;
    this.formularioMedico = true;
    this.botonCrearNuevoMedico = false;
    this.tablaMedico = false;
    this.seEstaActualizando = true;
  }

  cancelarEdicion() {
    this.idMedicoEditar = null;
    this.limpiarCampos();
    this.formularioMedico = false;
    this.botonCrearNuevoMedico = true;
    this.tablaMedico = true;
    this.seEstaActualizando = false;
  }
}
