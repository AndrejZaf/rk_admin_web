import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsletterComponent } from './containers/newsletter/newsletter.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'newsletter',
    pathMatch: 'full',
  },
  {
    path: 'newsletter',
    component: NewsletterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsletterRoutingModule {}
