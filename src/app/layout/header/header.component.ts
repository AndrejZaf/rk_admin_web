import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean = false;
  navItems = [
    { link: '/', title: 'Home' },
    { link: '/sneakers', title: 'Sneakers' },
    { link: '/orders', title: 'Orders' },
  ];
  isCollapsed = true;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  logout(): void {
    this.keycloakService.logout();
  }

  isUserLoggedIn(): void {
    this.keycloakService
      .isLoggedIn()
      .then((loggedIn) => {
        this.isLoggedIn = !loggedIn;
      })
      .catch((err) => {
        console.log(err);
        this.isLoggedIn = false;
      });
  }
}
