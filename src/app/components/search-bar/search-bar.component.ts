import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();
  searchTerm = '';
  filter = {
    selectedCategory: ''
  };
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  applyFilter() {
    this.categoryChange.emit(this.filter.selectedCategory);
  }
}