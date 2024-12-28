import { Component, OnInit } from '@angular/core';
import { Status, Task } from '../../models/task';
import { TaskService } from '../../service/task/task.service';
import { CategoryService } from '../../service/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: Category[] = [];
  showCreateForm = false;
  showUpdateForm = false;
  selectedTask?: Task;
  selectedCategory = '';
  searchTerm = '';

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });

    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

  onCategoryChange(categoryId: string) {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = [...this.tasks];

    // Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(task => task.categoryId === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.name.toLowerCase().includes(term) || 
        (task.description?.toLowerCase() || '').includes(term)
      );
    }

    this.filteredTasks = filtered;
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

