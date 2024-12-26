import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Priority, Status, Task } from '../../models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      const newTask: Task = this.taskForm.value;
      console.log('New Task:', newTask);
      
    }
  }
}
