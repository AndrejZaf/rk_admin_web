import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sneaker-card',
  templateUrl: './sneaker-card.component.html',
  styleUrls: ['./sneaker-card.component.scss'],
})
export class SneakerCardComponent {
  showInfo = false;
  @Input() sneakerName = '';
  @Input() sneakerUrl = '';
  @Input() sneakerPrice = 0;
  @Input() sneakerDescription = '';

  showAdditionalInfo() {
    this.showInfo = true;
  }

  hideAdditionalInfo() {
    this.showInfo = false;
  }
}
