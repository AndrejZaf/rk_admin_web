import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { sneakersData } from '../../data/sneakers-data';
import { ButtonCellRendererComponent } from './../../../../shared/components/button-cell-renderer/button-cell-renderer.component';
import { faPen, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { SneakerModalComponent } from '../../components/sneaker-modal/sneaker-modal.component';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.scss'],
})
export class SneakersComponent {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi: any;
  public columnDefs: ColDef[] = [
    {
      headerName: 'Brand',
      field: 'brand',
      filter: true,
      sortable: true,
      width: 100,
    },
    { headerName: 'Name', field: 'name', filter: true, sortable: true },
    {
      headerName: 'Description',
      field: 'description',
      filter: true,
      sortable: true,
    },
    {
      headerName: 'Price',
      field: 'price',
      filter: true,
      sortable: true,
      width: 100,
    },
    {
      field: '',
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        clicked: (field: any) => {
          const modalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true,
            backdropClass: 'blur-backdrop',
          });
          modalRef.componentInstance.title = 'Premium Sneaker';
          modalRef.componentInstance.body =
            'Are you sure you want to make this sneaker premium?';
          modalRef.componentInstance.confirmationText = 'Confirm';
          modalRef.componentInstance.cancelationText = 'Cancel';
        },
        icon: faStar,
      },
      width: 20,
      cellStyle: { textAlign: 'center' },
      suppressMovable: true,
    },
    {
      field: '',
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        clicked: (field: any) => {
          const modalRef = this.modalService.open(SneakerModalComponent, {
            centered: true,
            backdropClass: 'blur-backdrop',
            size: 'lg',
          });
        },
        icon: faPen,
      },
      width: 20,
      cellStyle: { textAlign: 'center' },
      suppressMovable: true,
    },
    {
      field: '',
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        clicked: (field: any) => {
          const modalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true,
            backdropClass: 'blur-backdrop',
          });
          modalRef.componentInstance.title = 'Delete sneaker';
          modalRef.componentInstance.body =
            'Are you sure you want to delete this sneaker?';
          modalRef.componentInstance.confirmationText = 'Confirm';
          modalRef.componentInstance.cancelationText = 'Cancel';
          modalRef.componentInstance.isDangerousOperation = true;
        },
        icon: faTrash,
      },
      width: 20,
      cellStyle: { textAlign: 'center' },
      suppressMovable: true,
    },
  ];

  public rowData$!: Observable<any[]>;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData$ = of(sneakersData);
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  onFirstDataRendered(): void {
    this.gridApi.sizeColumnsToFit();
  }
}
