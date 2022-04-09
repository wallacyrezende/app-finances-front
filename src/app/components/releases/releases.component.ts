import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {

  config!: AppConfig;

  subscription!: Subscription;

  @Input()
  dataTable: any;

  constructor(
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });
  }
}
