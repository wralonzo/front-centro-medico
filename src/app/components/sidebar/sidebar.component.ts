import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles: string[];
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    class: '',
    roles: ['SUPER_ADMINISTRADOR', 'MEDICO', 'SECRETARIA']
  },
  {
    path: '/usuarios',
    title: 'Usuarios',
    icon: 'ni ni-circle-08 text-info',
    class: '',
    roles: ['SUPER_ADMINISTRADOR']
  },
  {
    path: '/pacientes',
    title: 'Pacientes',
    icon: 'ni ni-circle-08 text-info',
    class: '',
    roles: ['SUPER_ADMINISTRADOR', 'SECRETARIA']
  },
  {
    path: '/especialidades',
    title: 'Especialidades',
    icon: 'ni ni-circle-08 text-info',
    class: '',
    roles: ['SUPER_ADMINISTRADOR', 'SECRETARIA']
  },
  {
    path: '/medicos',
    title: 'Medicos',
    icon: 'ni ni-circle-08 text-info',
    class: '',
    roles: ['SUPER_ADMINISTRADOR']
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public userRole: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.userRole = this.obtenerRolDelUsuario();
    this.filtarMenuItems();
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  obtenerRolDelUsuario(): string {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        return tokenPayload.rol;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
    return '';
  }

  filtarMenuItems(): void {
    this.menuItems = ROUTES.filter(menuItem => {
      return menuItem.roles.includes(this.userRole);
    });
  }
}
