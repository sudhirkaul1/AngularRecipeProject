import { Component, OnInit } from '@angular/core';
import { authService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: authService, private loggingService: LoggingService){}

ngOnInit(): void {
      this.authService.autoLogin();
      this.loggingService.printlog("Hello from AppCOmponent ngOnInit");
}
}
