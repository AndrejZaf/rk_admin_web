import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { OrderDTO } from '../../dto/order.dto';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: GridApi;
  public rowData$!: Observable<OrderDTO[]>;
  public columnDefs: ColDef[] = [
    {
      headerName: 'Order ID',
      field: 'id',
      filter: true,
      sortable: true,
    },
    {
      headerName: 'Order Price',
      field: 'totalPrice',
      filter: true,
      sortable: true,
    },
    {
      headerName: 'Email',
      field: 'email',
      filter: true,
      sortable: true,
    },
    {
      headerName: 'Address',
      field: 'address',
      filter: true,
      sortable: true,
    },
    {
      headerName: 'Order Status',
      field: 'orderStatus',
      filter: true,
      sortable: true,
      valueFormatter: (params) => {
        const val = params.value.replaceAll('_', ' ');
        return val[0].toUpperCase() + val.slice(1).toLowerCase();
      },
    },
  ];

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.rowData$ = this.orderService.loadOrders();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
}
