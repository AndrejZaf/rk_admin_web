import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sneaker-card',
  templateUrl: './sneaker-card.component.html',
  styleUrls: ['./sneaker-card.component.scss'],
})
export class SneakerCardComponent {
  @Input() sneakerName: string = '';
  @Input() sneakerUrl: string = '';
  @Input() sneakerPrice: number = 0;
  @Input() sneakerDescription: string = '';
}
