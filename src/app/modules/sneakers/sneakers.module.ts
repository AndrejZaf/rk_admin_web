import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SneakersRoutingModule } from './sneakers-routing.module';
import { SneakersComponent } from './containers/sneakers/sneakers.component';
import { AgGridModule } from 'ag-grid-angular';
import { SneakerModalComponent } from './components/sneaker-modal/sneaker-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SneakerService } from './services/sneaker.service';
import { NgxsModule } from '@ngxs/store';
import { SneakersState } from './store/sneakers.store';

@NgModule({
  declarations: [SneakersComponent, SneakerModalComponent],
  imports: [
    CommonModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    SneakersRoutingModule,
    DragDropModule,
    NgxsModule.forFeature([SneakersState]),
  ],
  providers: [SneakerService],
})
export class SneakersModule {}
