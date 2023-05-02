import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsletterRoutingModule } from './newsletter-routing.module';
import { NewsletterComponent } from './containers/newsletter/newsletter.component';
import { CustomerModalComponent } from './components/customer-modal/customer-modal.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewsletterComponent, CustomerModalComponent],
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    NewsletterRoutingModule,
  ],
})
export class NewsletterModule {}
