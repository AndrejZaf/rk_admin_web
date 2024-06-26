import { Component, OnInit } from '@angular/core';
import { salesData } from '../../data/data';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { SalesModel } from '../../models/sales.model';
import { SneakerService } from '../../services/sneaker.service';
import { SneakerDTO } from '../../dto/sneaker.dto';
import { SaleDTO } from '../../dto/sale.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  selectedPremiumSneaker: SneakerDTO | null = null;
  mostWantedSneaker: SneakerDTO | null = null;
  salesData: SaleDTO[] = [];
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

  constructor(private sneakerService: SneakerService) {}

  ngOnInit(): void {
    this.sneakerService.getPremiumSneaker().subscribe((data: SneakerDTO) => {
      this.selectedPremiumSneaker = data;
    });

    this.sneakerService.getPopularSneaker().subscribe((data: SneakerDTO) => {
      this.mostWantedSneaker = data;
    });

    this.sneakerService.getSneakerSaleStats().subscribe((data: SaleDTO[]) => {
      this.salesData = data;
    });
  }
}
