import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sneaker-modal',
  templateUrl: './sneaker-modal.component.html',
  styleUrls: ['./sneaker-modal.component.scss'],
})
export class SneakerModalComponent {
  urls: string[] = [];
  sneakerForm = this.formBuilder.group({
    image: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    sizes: this.formBuilder.array([]),
  });

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  close(): void {
    this.activeModal.close();
  }

  onSubmit() {
    if (this.sneakerForm.invalid) {
      return;
    }
    console.info('Form Valid!');
  }

  get sizes() {
    return this.sneakerForm.get('sizes') as FormArray;
  }

  addSize() {
    const sizeQuantity = this.formBuilder.group({
      size: ['', [Validators.required, Validators.min(36), Validators.max(47)]],
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
        reader.readAsDataURL(event.target.files[file]); // read file as data url
        reader.onload = (event) => {
          // called once readAsDataURL is completed
          this.urls.push(event.target!.result!.toString());
        };
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.urls, event.previousIndex, event.currentIndex);
  }
}
