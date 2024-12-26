import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasksFromLocalStorage());
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  getTask(id: string): Observable<Task> {
    const task = this.tasksSubject.value.find(t => t.id.toString() === id.toString());
    return task ? of(task) : throwError(() => new Error('Task not found'));
  }

  createTask(task: Task): Observable<Task> {
    const tasks = [...this.tasksSubject.value, task];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const tasks = this.tasksSubject.value;
    const index = tasks.findIndex(t => t.id.toString() === task.id.toString());
    
    if (index !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      this.tasksSubject.next(updatedTasks);
      return of(task);
    }
    
    return throwError(() => new Error('Task not found'));
  }

  deleteTask(id: string): Observable<void> {
    const tasks = this.tasksSubject.value.filter(task => task.id.toString() !== id.toString());
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
    return of(void 0);
  }

  private loadTasksFromLocalStorage(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
}
