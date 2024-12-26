import { Component, OnInit } from '@angular/core';
import { Priority, Status, Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor() {
    // Initialize with some sample tasks
    this.tasks = [
      {
        id: 1,
        name: 'Complete Project Proposal',
        description: 'Write and submit the project proposal document',
        dueDate: '2024-01-15',
        priority: Priority.HIGH,
        status: Status.IN_PROGRESS


      },
      {
        id: 2,
        name: 'Review Code',
        description: 'Review pull requests from team members',
        dueDate: '2024-01-15',
        priority: Priority.HIGH,
        status: Status.IN_PROGRESS
      }
    ];
  }
  
  ngOnInit(): void {
  }
}

