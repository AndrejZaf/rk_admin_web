import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { ButtonCellRendererComponent } from 'src/app/shared/components/button-cell-renderer/button-cell-renderer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModalComponent } from '../../components/customer-modal/customer-modal.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { NewsletterSubscriptionDTO } from '../../dtos/newsletter-subscription.dto';
import * as newsletterActions from '../../store/newsletter.actions';
import { NewsletterState } from '../../store/newsletter.store';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: GridApi;
  unsubscribe$ = new Subject<void>();
  public columnDefs: ColDef[] = [
    {
      headerName: 'Email',
      field: 'email',
      filter: true,
      sortable: true,
      width: 700,
    },
    {
      field: '',
      cellRenderer: ButtonCellRendererComponent,
      valueGetter: (params) => params.data.id,
      cellRendererParams: {
        clicked: (field: any) => {
          const modalRef = this.modalService.open(CustomerModalComponent, {
            centered: true,
            backdropClass: 'blur-backdrop',
            size: 'lg',
          });
          modalRef.componentInstance.isEdit = true;
          this.newsletterSubscriptions$
            .pipe(
              map((newsletterSubscriptions) =>
                newsletterSubscriptions.find((newsletterSubscription) => newsletterSubscription.id === field)
              )
            )
            .subscribe(
              (newsletterSubscription) => (modalRef.componentInstance.newsletterSubscription = newsletterSubscription)
            );
        },
        icon: 'bi bi-pencil',
      },
      width: 10,
      cellStyle: { textAlign: 'center' },
      suppressMovable: true,
    },
    {
      headerName: '',
      valueGetter: (params: any) => params.data.id,
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        clicked: (field: any) => {
          const modalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true,
            backdropClass: 'blur-backdrop',
          });
          modalRef.componentInstance.title = 'Delete user';
          modalRef.componentInstance.body = 'Are you sure you want to delete this user?';
          modalRef.componentInstance.confirmationText = 'Confirm';
          modalRef.componentInstance.cancelationText = 'Cancel';
          modalRef.componentInstance.isDangerousOperation = true;
          modalRef.componentInstance.emitData.subscribe((_: any) => {
            this.store.dispatch(new newsletterActions.DeleteNewsletterSubscription(field));
          });
        },
        icon: 'bi bi-trash',
      },
      width: 10,
      cellStyle: { textAlign: 'center' },
      suppressMovable: true,
    },
  ];

  public newsletterSubscriptions$!: Observable<NewsletterSubscriptionDTO[]>;

  constructor(private store: Store, private modalService: NgbModal, private actions$: Actions) {
    this.newsletterSubscriptions$ = this.store.select(NewsletterState.newsletterSubscriptions);
  }

  async ngOnInit(): Promise<void> {
    this.loadNewsletterSubscriptions();
    this.setupActionListeners();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  private loadNewsletterSubscriptions(): void {
    this.store.dispatch(new newsletterActions.LoadNewsletterSubscriptions());
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

  private actionListenerCallback(action: any, callback: (payload: any) => void): void {
    this.actions$
      .pipe(ofActionSuccessful(action), takeUntil(this.unsubscribe$))
      .subscribe(({ payload }) => callback(payload));
  }

  private setupActionListeners(): void {
    this.actionListenerCallback(newsletterActions.AddNewsletterSubscriptionSuccess, this.refreshTable.bind(this));
  }

  private refreshTable(): void {
    this.gridApi.redrawRows();
  }
}
