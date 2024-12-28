import { Component, OnInit } from '@angular/core';
import { StatistiqueService, TaskStatistics } from '../../service/statistique.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
  statistics: TaskStatistics = {
    completedPercentage: 0,
    pendingPercentage: 0,
    overdueCount: 0,
    totalTasks: 0
  };

  constructor(private statistiqueService: StatistiqueService) {}

  ngOnInit() {
    this.statistiqueService.getTaskStatistics().subscribe(stats => {
      this.statistics = stats;
    });
  }
}
