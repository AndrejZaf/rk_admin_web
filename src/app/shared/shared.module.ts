import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SneakerCardComponent } from './components/sneaker-card/sneaker-card.component';
import { ButtonCellRendererComponent } from './components/button-cell-renderer/button-cell-renderer.component';

import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [SneakerCardComponent, ButtonCellRendererComponent, ConfirmModalComponent],
  exports: [SneakerCardComponent],
  imports: [CommonModule, ToastrModule.forRoot()],
})
export class SharedModule {}
