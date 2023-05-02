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
import { Email } from '../../models/email.model';

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
      valueGetter: (params) => params.data.email,
      cellRendererParams: {
        clicked: (field: CellClickedEvent) => {
          console.log(field);
          const modalRef = this.modalService.open(CustomerModalComponent, {
            centered: true,
            backdropClass: 'blur-backdrop',
            size: 'lg',
          });
          modalRef.componentInstance.isEdit = true;
          modalRef.componentInstance.email = field;
        },
        icon: 'bi bi-pencil',
      },
      width: 10,
      cellStyle: { textAlign: 'center' },
      suppressMovable: true,
    },
  ];

  public rowData$!: Observable<Email[]>;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.rowData$ = of(emails);
  }

  onCellClicked(e: CellClickedEvent): void {
    // console.log('cellClicked', e);
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
