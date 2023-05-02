import { Component } from '@angular/core';
import { multi } from '../../data/data';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  multi: any[] = [];
  view: Number[] = [700, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Sneakers Sold';
  timeline: boolean = true;

  colorScheme: Color = {
    name: 'cust',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor() {
    Object.assign(this, { multi });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  mostWantedSneaker = {
    name: 'Air Jordan 1 Low SE Light Olive',
    price: 250,
    url: 'https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-low-se-light-olive.png?v=1661790120',
  };

  selectedPremiumSneaker = {
    name: 'Air Jordan 1 Retro Low OG SP Travis Scott Olive',
    price: 540,
    url: 'https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-low-og-sp-travis-scott-olive-1_2000x.png?v=1679486047',
  };
}
