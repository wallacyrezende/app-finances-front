import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../api/appconfig';
import { ConfigService } from '../../service/app.config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graphic-overview',
  templateUrl: './graphic-overview.component.html'
})
export class GraphicOverviewComponent implements OnInit {

  chartData: any;

  chartOptions: any;

  config!: AppConfig;

  subscription!: Subscription;

  constructor(
    public configService: ConfigService
  ) { }

  ngOnInit() {

    this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });

    this.chartData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [
        {
          label: 'Dados principais',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: '#2f4860',
          borderColor: '#2f4860',
          tension: .4
        },
        {
          label: 'Dados Secundários',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: '#00bb7e',
          borderColor: '#00bb7e',
          tension: .4
        }
      ]
    };
  }

  updateChartOptions() {
    if (this.config.dark)
      this.applyDarkTheme();
    else
      this.applyLightTheme();

  }

  applyDarkTheme() {
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
        y: {
          ticks: {
            color: '#ebedef'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
      }
    };
  }

  applyLightTheme() {
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef',
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef',
          }
        },
      }
    };
  }
}
