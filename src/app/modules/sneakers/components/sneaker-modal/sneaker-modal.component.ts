import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SneakerSizeDTO } from '../../dto/sneaker-size.dto';
import { SneakerService } from '../../services/sneaker.service';
import { SneakerDTO } from '../../dto/sneaker.dto';
import { Observable } from 'rxjs';
import { BrandDTO } from '../../dto/brand.dto';
import { Select, Store } from '@ngxs/store';
import { SneakersState } from '../../store/sneakers.store';
import { SneakersViewModel } from '../../models/sneakers.view-model';

@Component({
  selector: 'app-sneaker-modal',
  templateUrl: './sneaker-modal.component.html',
  styleUrls: ['./sneaker-modal.component.scss'],
})
export class SneakerModalComponent {
  urls: string[] = [];
  isEdit = false;
  sneakerForm = this.formBuilder.group({
    image: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    sizes: this.formBuilder.array([]),
    gender: ['', [Validators.required]],
  });

  brands$: Observable<BrandDTO[]>;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private sneakerService: SneakerService,
    private store: Store
  ) {
    this.brands$ = this.store.select(SneakersState.brands);
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
      price: +this.sneakerForm.controls.price.value!,
      brand: +this.sneakerForm.controls.brand.value!,
      description: this.sneakerForm.controls.description.value!,
      name: this.sneakerForm.controls.name.value!,
      sizes: sizes,
      images: this.urls,
      gender: +this.sneakerForm.controls.gender.value!,
    };
    console.log(sneakerDTO);
    this.sneakerService.addSneaker(sneakerDTO);
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
}
