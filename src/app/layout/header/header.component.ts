import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navItems = [
    { link: '/', title: 'Home' },
    { link: '/sneakers', title: 'Sneakers' },
    { link: '/orders', title: 'Orders' },
  ];
  isCollapsed = true;

  constructor(private keycloakService: KeycloakService) {}

  logout(): void {
    this.keycloakService.logout();
  }
}
