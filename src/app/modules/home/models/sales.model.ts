export interface SalesModel {
  name: string;
  series: SalesSeries[];
}

export interface SalesSeries {
  name: string;
  value: number;
}
