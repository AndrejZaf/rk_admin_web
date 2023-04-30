import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SneakerCardComponent } from './components/sneaker-card/sneaker-card.component';

@NgModule({
  declarations: [SneakerCardComponent],
  exports: [SneakerCardComponent],
  imports: [CommonModule],
})
export class SharedModule {}
