import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  showCreateForm = false;
  showUpdateForm = false;
  selectedCategory?: Category;
  alertMessage = '';
  alertType = ''; // 'success' or 'error'

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryCreated(category: Category) {
    this.categoryService.createCategory(category).subscribe({
      next: () => {
        this.showCreateForm = false;
        this.showAlert('Category created successfully', 'success');
      },
      error: (error) => {
        this.showCreateForm = false;
        this.showAlert(error.message, 'error');
      }
    });
  }

  onCategoryUpdated(category: Category) {
    this.categoryService.updateCategory(category).subscribe({
      next: () => {
        this.showUpdateForm = false;
        this.selectedCategory = undefined;
        this.showAlert('Category updated successfully', 'success');
      },
      error: (error) => {
        this.showUpdateForm = false;
        this.showAlert(error.message, 'error');
      }
    });
  }

  onDeleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe();
  }

  onEditCategory(category: Category) {
    this.selectedCategory = { ...category };
    this.showUpdateForm = true;
  }

  closeModals() {
    this.showCreateForm = false;
    this.showUpdateForm = false;
    this.selectedCategory = undefined;
  }

  private showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 3000);
  }
}
