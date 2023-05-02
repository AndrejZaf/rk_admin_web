import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'sneakers',
        loadChildren: () => import('./modules/sneakers/sneakers.module').then((m) => m.SneakersModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('./modules/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'newsletter',
        loadChildren: () => import('./modules/newsletter/newsletter.module').then((m) => m.NewsletterModule),
      },
    ],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
