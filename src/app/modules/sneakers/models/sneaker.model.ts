import { SneakerSize } from './sneaker-size.model';

export interface Sneaker {
  brand: number;
  name: string;
  description: string;
  price: number;
  sizes: SneakerSize[];
  images: string[];
  gender: number;
}
