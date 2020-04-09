import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  PageTitle = 'Dashboard';
  constructor(private appService: GlobalService) {
    this.appService.setPageTitle(this.PageTitle);
  }

  ngOnInit() {
  }
}
