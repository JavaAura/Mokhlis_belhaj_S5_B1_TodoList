import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  @Input() category?: Category;
  @Input() update: boolean = false;
  @Output() categoryCreated = new EventEmitter<Category>();
  @Output() categoryUpdated = new EventEmitter<Category>();
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    if (this.update && this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  private initForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.categoryForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.categoryForm.get(fieldName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return `${fieldName} is required`;
      }
      if (control.errors['minlength']) {
        return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      
      if (this.update && this.category) {
        const updatedCategory: Category = {
          ...this.category,
          ...formData
        };
        this.categoryUpdated.emit(updatedCategory);
      } else {
        this.categoryCreated.emit(formData);
      }
      this.resetForm();
    }
  }

  resetForm() {
    this.submitted = false;
    this.categoryForm.reset();
  }
}
