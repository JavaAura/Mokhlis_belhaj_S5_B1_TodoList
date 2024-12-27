import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    CategoryListComponent,
    NavbarComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
