import { BrandDTO } from '../dto/brand.dto';
import { SneakerDTO } from '../dto/sneaker.dto';

export interface SneakersViewModel {
  brands: BrandDTO[];
  sneakers: SneakerDTO[];
  premiumSneakerId: number;
}
