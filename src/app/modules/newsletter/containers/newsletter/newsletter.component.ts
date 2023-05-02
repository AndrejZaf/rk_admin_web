import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { emails } from '../../data/emails';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [
    {
      headerName: 'Email',
      field: 'email',
      filter: true,
      sortable: true,
    },
  ];

  public rowData$!: Observable<any[]>;

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData$ = of(emails);
  }

  onCellClicked(e: CellClickedEvent): void {
    // console.log('cellClicked', e);
  }

  onFirstDataRendered(): void {
    this.gridApi.sizeColumnsToFit();
  }

  addEmail(): void {}

  downloadEmails(): void {
    const date = Date.now();
    this.gridApi.exportDataAsCsv({
      fileName: `${'newsletter-emails-' + date}`,
    });
  }
}
