import { SalesModel } from '../models/sales.model';

export const salesData: SalesModel[] = [
  {
    name: 'Nike',
    series: [
      {
        name: '27-04-2023',
        value: 22,
      },
      {
        name: '28-04-2023',
        value: 15,
      },
      {
        name: '29-04-2023',
        value: 40,
      },
    ],
  },
  {
    name: 'Adidas',
    series: [
      {
        name: '27-04-2023',
        value: 4,
      },
      {
        name: '28-04-2023',
        value: 13,
      },
      {
        name: '29-04-2023',
        value: 8,
      },
    ],
  },
  {
    name: 'Under Armour',
    series: [
      {
        name: '27-04-2023',
        value: 2,
      },
      {
        name: '28-04-2023',
        value: 5,
      },
    ],
  },
];
