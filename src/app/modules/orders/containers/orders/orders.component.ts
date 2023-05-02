import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
  ISelectCellEditorParams,
} from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { orders } from '../../data/orders';
import { OrderStatus } from '../../enums/order-status.enum';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [
    {
      headerName: 'Order ID',
      field: 'orderId',
      filter: true,
      sortable: true,
      width: 100,
    },
    {
      headerName: 'Order Price',
      field: 'orderPrice',
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
      width: 100,
    },
    {
      headerName: 'Order Status',
      field: 'orderStatus',
      cellEditor: 'agSelectCellEditor',
      editable: true,
      singleClickEdit: true,
      cellEditorParams: {
        values: [
          OrderStatus.READY_FOR_DISPATCH,
          OrderStatus.DISPATCHED,
          OrderStatus.DELIVERED,
        ],
      } as ISelectCellEditorParams,
      filter: true,
      sortable: true,
      width: 100,
    },
  ];

  public rowData$!: Observable<Order[]>;

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData$ = of(orders);
  }

  onCellClicked(e: CellClickedEvent): void {
    // console.log('cellClicked', e);
  }

  onFirstDataRendered(): void {
    this.gridApi.sizeColumnsToFit();
  }
}
