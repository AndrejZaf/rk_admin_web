import { InventorySaleDTO } from './inventory-sale.dto';

export interface SaleDTO {
  name: string;
  series: InventorySaleDTO[];
}
