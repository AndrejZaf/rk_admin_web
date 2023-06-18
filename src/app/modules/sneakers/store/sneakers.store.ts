import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { SneakersViewModel } from '../models/sneakers.view-model';
import { SneakerDTO } from '../dto/sneaker.dto';
import { SneakerService } from './../services/sneaker.service';
import * as sneakersActions from './sneakers.actions';
import { Observable, catchError, from, map } from 'rxjs';
import { BrandDTO } from './../dto/brand.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { patch, updateItem } from '@ngxs/store/operators';

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
    { getState, patchState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.AddSneakerSuccess
  ): void {
    const sneakers = getState().sneakers;
    sneakers.push(payload);
    patchState({ sneakers: sneakers });
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
    { getState, setState }: StateContext<SneakersViewModel>,
    { payload }: sneakersActions.EditSneakerSuccess
  ): void {
    setState(
      patch({
        sneakers: updateItem((sneaker) => sneaker.id === payload.id, patch(payload)),
      })
    );
  }
}
