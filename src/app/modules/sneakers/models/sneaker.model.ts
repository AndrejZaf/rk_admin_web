import { SneakerSize } from './sneaker-size.model';

export interface Sneaker {
  brand: string;
  name: string;
  description: string;
  price: number;
  sizes: SneakerSize[];
  images: string[];
}
