import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './containers/orders/orders.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, AgGridModule, HttpClientModule, OrdersRoutingModule],
})
export class OrdersModule {}
