import { OrderStatus } from '../enums/order-status.enum';

export interface Order {
  orderId: string;
  orderPrice: number;
  orderStatus: OrderStatus;
  email: string;
  address: string;
}
