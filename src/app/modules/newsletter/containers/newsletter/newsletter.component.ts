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
import { ButtonCellRendererComponent } from 'src/app/shared/components/button-cell-renderer/button-cell-renderer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModalComponent } from '../../components/customer-modal/customer-modal.component';

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
    {
      field: '',
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        clicked: (field: any) => {
          const modalRef = this.modalService.open(CustomerModalComponent, {
            centered: true,
            backdropClass: 'blur-backdrop',
            size: 'lg',
          });
          modalRef.componentInstance.isEdit = true;
        },
        icon: 'bi bi-pencil',
      },
      width: 10,
      cellStyle: { textAlign: 'center' },
      suppressMovable: true,
    },
  ];

  public rowData$!: Observable<any[]>;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

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

  addEmail(): void {
    this.modalService.open(CustomerModalComponent, {
      centered: true,
      backdropClass: 'blur-backdrop',
      size: 'lg',
    });
  }

  downloadEmails(): void {
    const date = Date.now();
    this.gridApi.exportDataAsCsv({
      fileName: `${'newsletter-emails-' + date}`,
    });
  }
}
