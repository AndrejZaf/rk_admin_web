import { Component } from '@angular/core';

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
}
