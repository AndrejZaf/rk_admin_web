import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;
  navItems = [
    { link: '/', title: 'Home' },
    { link: '/sneakers', title: 'Sneakers' },
    { link: '/orders', title: 'Orders' },
  ];
  isCollapsed = true;

  constructor(private keycloakService: KeycloakService, private router: Router) {}

  navigateHome(): void {
    this.router.navigate(['/']);
  }

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
