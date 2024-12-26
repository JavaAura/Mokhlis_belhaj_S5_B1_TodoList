import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority, Status, Task } from '../../models/task';

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

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    if (this.update && this.task) {
      this.taskForm.patchValue({
        name: this.task.name,
        description: this.task.description,
        dueDate: this.formatDate(this.task.dueDate),
        priority: this.task.priority,
        status: this.task.status
      });
    }
  }

  private formatDate(date: string): string {
    return date.split('.')[0]; // Remove milliseconds if present
  }

  private initForm() {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: [Priority.MEDIUM, Validators.required],
      status: [Status.TODO, Validators.required]
    });
  }

  onSubmit() {
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
        this.taskCreated.emit(newTask);
      }
      this.resetForm();
    }
  }

  resetForm() {
    this.error = '';
    this.taskForm.reset({
      priority: Priority.MEDIUM,
      status: Status.TODO
    });
  }
}
