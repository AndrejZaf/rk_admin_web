import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.scss'],
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.value);
  }

  refresh(): boolean {
    return true;
  }
}
