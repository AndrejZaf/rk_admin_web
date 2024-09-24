import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { SneakersViewModel } from '../models/sneakers.view-model';
import { SneakerDTO } from '../dto/sneaker.dto';
import { SneakerService } from './../services/sneaker.service';
import * as sneakersActions from './sneakers.actions';
import { Observable, catchError, from, map } from 'rxjs';
import { BrandDTO } from './../dto/brand.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';

export const sneakersState = (): SneakersViewModel => ({
  brands: [],
  sneakers: [],
  premiumSneakerId: -1,
});

@State<SneakersViewModel>({
  name: 'sneakersState',
  defaults: sneakersState(),
})
@Injectable()
export class SneakersState {
  @Selector()
  static brands(state: SneakersViewModel): BrandDTO[] {
    return state.brands;
  }

  @Selector()
  static sneakers(state: SneakersViewModel): SneakerDTO[] {
    return state.sneakers;
  }

  constructor(private sneakerService: SneakerService) {}

  @Action(sneakersActions.LoadBrands)
  loadBrands({ dispatch }: StateContext<SneakersViewModel>): Observable<void | BrandDTO[] | Observable<void>> {
    return from(this.sneakerService.loadBrands()).pipe(
      map((data: BrandDTO[]) => dispatch(new sneakersActions.LoadBrandsSuccess(data))),
      catchError((err: HttpErrorResponse) => dispatch(new sneakersActions.LoadBrandsFail(err)))
    );
  }

  @Action(sneakersActions.LoadBrandsSuccess)
  loadBrandsSuccess(
    { patchState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.LoadBrandsSuccess
  ): void {
    patchState({ brands: payload });
  }

  @Action(sneakersActions.LoadSneakers)
  loadSneakers({ dispatch }: StateContext<SneakersViewModel>): Observable<void | SneakerDTO[] | Observable<void>> {
    return from(this.sneakerService.loadSneakers()).pipe(
      map((data: SneakerDTO[]) => dispatch(new sneakersActions.LoadSneakersSuccess(data))),
      catchError((err: HttpErrorResponse) => dispatch(new sneakersActions.LoadSneakersFail(err)))
    );
  }

  @Action(sneakersActions.LoadSneakersSuccess)
  loadSneakersSuccess(
    { patchState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.LoadSneakersSuccess
  ): void {
    patchState({ sneakers: payload });
  }

  @Action(sneakersActions.AddSneaker)
  addSneaker(
    { dispatch }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.AddSneaker
  ): Observable<void | SneakerDTO | Observable<void>> {
    return from(this.sneakerService.addSneaker(payload)).pipe(
      map((data: SneakerDTO) => dispatch(new sneakersActions.AddSneakerSuccess(data))),
      catchError((err: HttpErrorResponse) => dispatch(new sneakersActions.AddSneakerFail(err)))
    );
  }

  @Action(sneakersActions.AddSneakerSuccess)
  addSneakerSuccess(
    { setState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.AddSneakerSuccess
  ): void {
    setState(
      patch({
        sneakers: insertItem(payload),
      })
    );
  }

  @Action(sneakersActions.EditSneaker)
  editSneaker(
    { dispatch }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.EditSneaker
  ): Observable<void | SneakerDTO | Observable<void>> {
    return from(this.sneakerService.editSneaker(payload)).pipe(
      map((data: SneakerDTO) => dispatch(new sneakersActions.EditSneakerSuccess(data))),
      catchError((err: HttpErrorResponse) => dispatch(new sneakersActions.EditSneakerFail(err)))
    );
  }

  @Action(sneakersActions.EditSneakerSuccess)
  editSneakerSuccess(
    { setState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.EditSneakerSuccess
  ): void {
    setState(
      patch({
        sneakers: updateItem((sneaker) => sneaker.id === payload.id, patch(payload)),
      })
    );
  }

  @Action(sneakersActions.DeleteSneaker)
  deleteSneaker(
    { dispatch }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.DeleteSneaker
  ): Observable<void | SneakerDTO | Observable<void>> {
    return from(this.sneakerService.deleteSneaker(payload)).pipe(
      map(() => dispatch(new sneakersActions.DeleteSneakerSuccess(payload))),
      catchError((err: HttpErrorResponse) => dispatch(new sneakersActions.DeleteSneakerFail(err)))
    );
  }

  @Action(sneakersActions.DeleteSneakerSuccess)
  deleteSneakerSuccess(
    { setState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.DeleteSneakerSuccess
  ): void {
    setState(
      patch({
        sneakers: removeItem((sneaker) => sneaker.id === payload),
      })
    );
  }

  @Action(sneakersActions.PremiumSneaker)
  premiumSneaker(
    { dispatch }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.DeleteSneaker
  ): Observable<void | SneakerDTO | Observable<void>> {
    return from(this.sneakerService.premiumSneaker(payload)).pipe(
      map(() => dispatch(new sneakersActions.PremiumSneakerSuccess(payload))),
      catchError((err: HttpErrorResponse) => dispatch(new sneakersActions.PremiumSneakerFail(err)))
    );
  }

  @Action(sneakersActions.PremiumSneakerSuccess)
  premiumSneakerSuccess(
    { setState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.PremiumSneakerSuccess
  ): void {
    setState(
      patch({
        sneakers: updateItem((sneaker) => sneaker.special === true, patch({ special: false })),
      })
    );
    setState(
      patch({
        sneakers: updateItem((sneaker) => sneaker.id === payload, patch({ special: true })),
      })
    );
  }
}
