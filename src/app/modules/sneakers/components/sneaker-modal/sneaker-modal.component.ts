import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SneakerSizeDTO } from '../../dto/sneaker-size.dto';
import { SneakerDTO } from '../../dto/sneaker.dto';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BrandDTO } from '../../dto/brand.dto';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { SneakersState } from '../../store/sneakers.store';
import * as sneakersActions from '../../store/sneakers.actions';

@Component({
  selector: 'app-sneaker-modal',
  templateUrl: './sneaker-modal.component.html',
  styleUrls: ['./sneaker-modal.component.scss'],
})
export class SneakerModalComponent implements OnInit {
  urls: string[] = [];
  isEdit = false;
  sneakerForm: FormGroup;
  sneaker: SneakerDTO | undefined;
  brands$: Observable<BrandDTO[]>;
  unsubscribe$ = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private store: Store,
    private actions$: Actions
  ) {
    this.sneakerForm = this.formBuilder.group({
      image: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      sizes: this.formBuilder.array([]),
      gender: ['', [Validators.required]],
    });
    this.brands$ = this.store.select(SneakersState.brands);
  }
  ngOnInit(): void {
    this.setupActionListeners();
    if (this.isEdit) {
      this.sneakerForm.controls['name'].setValue(this.sneaker!.name);
      this.sneakerForm.controls['description'].setValue(this.sneaker!.description);
      this.sneakerForm.controls['price'].setValue(this.sneaker!.price);
      this.sneakerForm.controls['gender'].setValue(this.sneaker!.gender);
      this.sneakerForm.controls['brand'].setValue(this.sneaker!.brandId);
      this.sneakerForm.controls['image'].setValue(this.sneaker!.images);
      this.sneaker?.sizes.map((sneakerSize: SneakerSizeDTO) => {
        const sizeQuantity = this.formBuilder.group({
          size: [sneakerSize.size, [Validators.required]],
          quantity: [sneakerSize.quantity, [Validators.required]],
        });
        this.sizes.push(sizeQuantity);
      });
      this.urls = this.sneaker!.images;
    }
  }

  close(): void {
    this.activeModal.close();
  }

  onSubmit() {
    if (this.sneakerForm.invalid) {
      return;
    }

    const sizes = this.sizes.controls.map((control) => {
      const size = control.get('size')?.value;
      const quantity = control.get('quantity')?.value;
      const sneakerSize = { size, quantity } as SneakerSizeDTO;
      return sneakerSize;
    });

    const sneakerDTO: SneakerDTO = {
      price: +this.sneakerForm.controls['price'].value!,
      brandId: +this.sneakerForm.controls['brand'].value!,
      description: this.sneakerForm.controls['description'].value!,
      name: this.sneakerForm.controls['name'].value!,
      sizes: sizes,
      images: this.urls,
      gender: +this.sneakerForm.controls['gender'].value!,
    };

    if (this.isEdit) {
      sneakerDTO.id = this.sneaker?.id;
      this.store.dispatch(new sneakersActions.EditSneaker(sneakerDTO));
    } else {
      this.store.dispatch(new sneakersActions.AddSneaker(sneakerDTO));
    }
  }

  get sizes() {
    return this.sneakerForm.get('sizes') as FormArray;
  }

  addSize() {
    const sizeQuantity = this.formBuilder.group({
      size: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
    this.sizes.push(sizeQuantity);
  }

  deleteSize(sizeIndex: number) {
    this.sizes.removeAt(sizeIndex);
  }

  onSelectFiles(event: any): void {
    if (event.target.files && event.target.files[0]) {
      Object.keys(event.target.files).forEach((file: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[file]);
        reader.onload = (event) => {
          this.urls.push(event.target!.result!.toString());
        };
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.urls, event.previousIndex, event.currentIndex);
  }

  doubleClick(image: string): void {
    this.urls.splice(this.urls.indexOf(image), 1);
  }

  private actionListenerCallback(action: any, callback: (payload: any) => void): void {
    this.actions$
      .pipe(ofActionSuccessful(action), takeUntil(this.unsubscribe$))
      .subscribe(({ payload }) => callback(payload));
  }

  private setupActionListeners(): void {
    this.actionListenerCallback(sneakersActions.AddSneakerSuccess, this.addSneakerSuccess.bind(this));
    this.actionListenerCallback(sneakersActions.EditSneakerSuccess, this.editSneakerSuccess.bind(this));
  }

  private addSneakerSuccess(): void {
    this.close();
  }

  private editSneakerSuccess(): void {
    this.close();
  }
}
