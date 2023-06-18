import { HttpErrorResponse } from '@angular/common/http';
import { BrandDTO } from '../dto/brand.dto';
import { SneakerDTO } from '../dto/sneaker.dto';

export class LoadSneakers {
  static readonly type = '[Sneakers] Load Sneakers';
}

export class LoadSneakersSuccess {
  static readonly type = '[Sneakers] Load Sneakers Success';
  constructor(readonly payload: SneakerDTO[]) {}
}

export class LoadSneakersFail {
  static readonly type = '[Sneakers] Load Sneakers Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class LoadBrands {
  static readonly type = '[Sneakers] Load Brands';
}

export class LoadBrandsSuccess {
  static readonly type = '[Sneakers] Load Brands Success';
  constructor(readonly payload: BrandDTO[]) {}
}

export class LoadBrandsFail {
  static readonly type = '[Sneakers] Load Brands Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class AddSneaker {
  static readonly type = '[Sneakers] Add Sneaker';
}

export class AddSneakerSuccess {
  static readonly type = '[Sneakers] Add Sneaker Success';
  constructor(readonly payload: SneakerDTO) {}
}

export class AddSneakerFail {
  static readonly type = '[Sneakers] Add Sneaker Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class EditSneaker {
  static readonly type = '[Sneakers] Edit Sneaker';
}

export class EditSneakerSuccess {
  static readonly type = '[Sneakers] Edit Sneaker Success';
  constructor(readonly payload: SneakerDTO) {}
}

export class EditSneakerFail {
  static readonly type = '[Sneakers] Edit Sneaker Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class DeleteSneaker {
  static readonly type = '[Sneakers] Delete Sneaker';
}

export class DeleteSneakerSuccess {
  static readonly type = '[Sneakers] Delete Sneaker Success';
}

export class DeleteSneakerFail {
  static readonly type = '[Sneakers] Delete Sneaker Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class SneakerPremium {}

export class SneakerPremiumSuccess {}

export class SneakerPremiumFail {}
