import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  PageTitle;
  constructor(private appService: GlobalService) { }
  ngOnInit() {
    this.appService.getPageTitle().subscribe(data => { this.PageTitle = data; });
  }
}
