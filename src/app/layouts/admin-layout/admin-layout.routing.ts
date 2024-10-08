import { Routes } from '@angular/router';
import { CitasComponent } from 'src/app/pages/citas/citas';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { EspecialidadesComponent } from 'src/app/pages/especialidades/especialidades.component';
import { MedicosComponent } from 'src/app/pages/medicos/medicos.component';
import { PacientesComponent } from 'src/app/pages/pacientes/pacientes.component';
import { UsuariosComponent } from 'src/app/pages/usuarios/usuarios.component';
import { ProductoComponent } from '../../pages/productos/producto';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'especialidades', component: EspecialidadesComponent },
  { path: 'medicos', component: MedicosComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'productos', component: ProductoComponent },
];
