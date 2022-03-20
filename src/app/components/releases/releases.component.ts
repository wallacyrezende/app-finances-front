import { Component, OnInit } from '@angular/core';
import { Product } from '../../api/product';
import { ProductService } from '../../service/productservice';
import { ConfigService } from '../../service/app.config.service';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html'
})
export class ReleasesComponent implements OnInit {

  products!: Product[];

  config!: AppConfig;

  subscription!: Subscription;

  constructor(
    private productService: ProductService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });
        this.productService.getProductsSmall().then(data => this.products = data);
  }

}
