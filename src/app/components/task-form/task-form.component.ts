import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Priority, Status, Task } from '../../models/task';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  Priority = Priority;
  Status = Status;
  taskForm!: FormGroup;
  @Input() task?: Task;
  @Input() update: boolean = false;
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();
  error: string = '';
  submitted = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });

    if (this.update && this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  private formatDate(date: string): string {
    return date.split('.')[0]; // Remove milliseconds if present
  }

  private initForm() {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(500)]],
      dueDate: ['', [Validators.required, this.futureDateValidator()]],
      priority: [Priority.MEDIUM, [Validators.required]],
      status: [Status.TODO, [Validators.required]],
      categoryId: ['']
    });
  }

  private futureDateValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control.value) {
        const today = new Date();
        const inputDate = new Date(control.value);
        
        if (this.update && this.task && 
            new Date(this.task.dueDate).getTime() === inputDate.getTime()) {
          return null;
        }
        
        if (inputDate < today) {
          return { 'pastDate': true };
        }
      }
      return null;
    };
  }

  // Getter methods for easy access in template
  get f() { return this.taskForm.controls; }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.taskForm.get(fieldName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (control.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} cannot exceed ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['pastDate']) {
        return 'Due date must be in the future';
      }
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.taskForm.valid) {
      
      const formData = this.taskForm.value;
      
      if (this.update && this.task) {
        const updatedTask: Task = {
          ...this.task,
          ...formData
        };
        this.taskUpdated.emit(updatedTask);
      } else {
        const newTask: Task = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString()
        };

        console.log(formData);
        this.taskCreated.emit(newTask);
      }
      this.resetForm();
    }
  }

  resetForm() {
    this.submitted = false;
    this.error = '';
    this.taskForm.reset({
      priority: Priority.MEDIUM,
      status: Status.TODO
    });
  }
}
