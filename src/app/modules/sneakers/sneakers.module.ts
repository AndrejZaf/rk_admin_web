import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { SneakersRoutingModule } from './sneakers-routing.module';
import { SneakersComponent } from './containers/sneakers/sneakers.component';
import { AgGridModule } from 'ag-grid-angular';
import { SneakerModalComponent } from './components/sneaker-modal/sneaker-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SneakerService } from './services/sneaker.service';
import { NgxsModule } from '@ngxs/store';
import { SneakersState } from './store/sneakers.store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/sneakers/', '.json');
}

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
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
      isolate: true,
    }),
  ],
  providers: [SneakerService],
})
export class SneakersModule {}
