import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public PageTitle = 'Dashboard';
  public employees = [];
  public errorMsg;

  constructor(private appService: GlobalService, private empService : EmployeeService) {
    this.appService.setPageTitle(this.PageTitle);
  }
  
  ngOnInit() :void {
    this.empService.getEmployee().subscribe(data => this.employees = data,error => this.errorMsg = error);
  }
}
