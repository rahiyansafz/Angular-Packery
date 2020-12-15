import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chart } from './chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'ng-packery-demo';
  charts: BehaviorSubject<Chart[]>;
  selectedChart: Chart = null;

  ngOnInit() {
    const sizes = [[2, 2], [2, 1], [1, 1]];
    this.charts = new BehaviorSubject(sizes.map(size => new Chart([size[0], size[1]],
      this.randomChartType(), this.randomChartData())));
  }

  addChart() {
    const charts = this.charts.getValue();
    charts.push(new Chart([1, 1], this.randomChartType(), this.randomChartData()));
    this.charts.next(charts);
  }

  randomChartType(): string {
    const chartTypes = ['horizontal', 'vertical', 'pie'];
    return chartTypes[Math.floor((Math.random() * chartTypes.length))];
  }

  randomChartData(): Array<{name: string, value: number}> {
    return ['Red', 'Blue', 'Violet'].map(country => {
      return {
        name: country,
        value: Math.round(Math.random() * 1000)
      };
    });
  }

  onResize(chart: Chart): void {
    chart.redraw();
  }

  onDelete(chart: Chart): void {
    const charts: Chart[] = this.charts.getValue();
    charts.splice(charts.indexOf(chart), 1);
    this.charts.next(charts);
  }

  onOpenEdit(chart: Chart): void {
    this.selectedChart = chart;
  }

  onCloseEdit(): void {
    this.selectedChart = null;
  }

}
