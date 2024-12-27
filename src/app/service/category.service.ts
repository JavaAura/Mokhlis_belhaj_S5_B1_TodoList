import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Category } from '../models/category';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>(this.loadCategoriesFromLocalStorage());
  categories$ = this.categoriesSubject.asObservable();

  constructor() {
    if (!localStorage.getItem('categories')) {
      localStorage.setItem('categories', JSON.stringify([]));
    }
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  isNameUnique(name: string, excludeId?: string): boolean {
    return !this.categoriesSubject.value.some(category => 
      category.name.toLowerCase() === name.toLowerCase() && 
      category.id !== excludeId
    );
  }

  createCategory(category: Category): Observable<Category> {
    if (!this.isNameUnique(category.name)) {
      return throwError(() => new Error('Category name must be unique'));
    }

    const newCategory = {
      ...category,
      id: Date.now().toString()
    };
    const categories = [...this.categoriesSubject.value, newCategory];
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categoriesSubject.next(categories);
    return of(newCategory);
  }

  updateCategory(category: Category): Observable<Category> {
    if (!this.isNameUnique(category.name, category.id)) {
      return throwError(() => new Error('Category name must be unique'));
    }

    const categories = this.categoriesSubject.value;
    const index = categories.findIndex(c => c.id === category.id);
    
    if (index !== -1) {
      const updatedCategories = [...categories];
      updatedCategories[index] = category;
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      this.categoriesSubject.next(updatedCategories);
      return of(category);
    }
    
    return throwError(() => new Error('Category not found'));
  }

  deleteCategory(id: string): Observable<void> {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.map((task: Task) => {
      if (task.categoryId === id) {
        return { ...task, categoryId: undefined };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    const categories = this.categoriesSubject.value.filter(cat => cat.id !== id);
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categoriesSubject.next(categories);
    return of(void 0);
  }

  private loadCategoriesFromLocalStorage(): Category[] {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : [];
  }

  getTasksByCategory(categoryId: string): Task[] {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return tasks.filter((task: Task) => task.categoryId === categoryId);
  }
}
