import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  valCheck: string[] = ['remember'];

  password: string = '';

  constructor(public configService: ConfigService){ }

  ngOnInit(): void {

  }


}
