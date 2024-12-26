import { Component, OnInit } from '@angular/core';
import { Status, Task } from '../../models/task';
import { TaskService } from '../../service/task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showCreateForm = false;
  showUpdateForm = false;
  selectedTask?: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onTaskCreated(task: Task) {
    this.taskService.createTask(task).subscribe(() => {
      this.showCreateForm = false;
    });
  }

  onTaskUpdated(task: Task) {
    this.taskService.updateTask(task).subscribe(() => {
      this.showUpdateForm = false;
      this.selectedTask = undefined;
    });
  }

  onDeleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe();
  }

  onEditTask(task: Task) {
    this.selectedTask = { ...task };
    this.showUpdateForm = true;
  }

  closeModals() {
    this.showCreateForm = false;
    this.showUpdateForm = false;
    this.selectedTask = undefined;
  }

  isOverdue(task: Task): boolean {
    return new Date(task.dueDate) < new Date() && 
           task.status !== Status.COMPLETED;
  }
}

