import { Injectable } from '@angular/core';
import { TaskService } from './task/task.service';
import { map } from 'rxjs/operators';
import { Task, Status } from '../models/task';

export interface TaskStatistics {
  completedPercentage: number;
  pendingPercentage: number;
  overdueCount: number;
  totalTasks: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  constructor(private taskService: TaskService) {}

  getTaskStatistics() {
    return this.taskService.tasks$.pipe(
      map(tasks => this.calculateStatistics(tasks))
    );
  }

  private calculateStatistics(tasks: Task[]): TaskStatistics {
    const totalTasks = tasks.length;
    if (totalTasks === 0) {
      return {
        completedPercentage: 0,
        pendingPercentage: 0,
        overdueCount: 0,
        totalTasks: 0
      };
    }

    const completedTasks = tasks.filter(task => task.status === Status.COMPLETED).length;
    const overdueCount = tasks.filter(task => 
      new Date(task.dueDate) < new Date() && task.status !== Status.COMPLETED
    ).length;

    return {
      completedPercentage: (completedTasks / totalTasks) * 100,
      pendingPercentage: ((totalTasks - completedTasks) / totalTasks) * 100,
      overdueCount,
      totalTasks
    };
  }
}
