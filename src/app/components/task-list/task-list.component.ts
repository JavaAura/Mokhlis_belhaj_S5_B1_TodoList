import { Component, OnInit } from '@angular/core';
import { Status, Task } from '../../models/task';
import { TaskService } from '../../service/task/task.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';

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
  categories: Category[] = [];

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });

    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
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

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }
}

