import { Component } from '@angular/core';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navItems = [
    { link: '/home', title: 'Home' },
    { link: '/sneakers', title: 'Sneakers' },
    { link: '/orders', title: 'Orders' },
    { link: '/newsletter', title: 'Newsletter' },
  ];
  isCollapsed = true;
  toggleIcon = faBars;
  shoppingIcon = faShoppingCart;
}
