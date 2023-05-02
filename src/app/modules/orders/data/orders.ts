import { OrderStatus } from '../enums/order-status.enum';

export const orders = [
  {
    orderId: '#28374671',
    orderPrice: 420,
    orderStatus: OrderStatus.DELIVERED,
    email: 'bojan.janevski@gmail.com',
    address: 'Some address',
  },
  {
    orderId: '#3717257',
    orderPrice: 450,
    orderStatus: OrderStatus.READY_FOR_DISPATCH,
    email: 'andrej.zafirovski@gmail.com',
    address: 'Some address',
  },
  {
    orderId: '#2908201',
    orderPrice: 696,
    orderStatus: OrderStatus.DELIVERED,
    email: 'andrej.zafirovski@gmail.com',
    address: 'Some address',
  },
];
