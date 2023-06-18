import { SneakerSizeDTO } from './sneaker-size.dto';

export interface SneakerDTO {
  id?: number;
  brandId: number;
  name: string;
  description: string;
  price: number;
  sizes: SneakerSizeDTO[];
  images: string[];
  gender: number;
  special?: boolean;
}
