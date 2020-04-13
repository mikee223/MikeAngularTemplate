import { Component, OnInit, Input, Output, EventEmitter, QueryList, ViewChildren, AfterViewInit, HostListener, Directive, ViewChild, ElementRef } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable } from 'rxjs';

import { mEmployee } from '../../model/employee';
import { NgbdSortableHeader,SortEvent } from '../../properties/table.directive';
import { TestDirective } from '../../properties/test.directive';


@Component({
  selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, AfterViewInit {
  
  // @HostListener('click') onClick() {
  //   console.log('hehe')
  // }
  
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;  
  // @ViewChild(TestDirective) test : TestDirective

  public PageTitle = 'Dashboard';
  public employees = [];
  public errorMsg;

  employee$: Observable<mEmployee[]>;
  total$: Observable<number>;

  
  constructor(public appService: GlobalService, public empService : EmployeeService) {
    this.appService.setPageTitle(this.PageTitle);
    this.employee$ = empService.table$;
    this.total$ = empService.total$;
  }

  ngOnInit() :void {    
    this.empService.getEmployee().subscribe(data => this.employees = data,error => this.errorMsg = error);        
  }
    
  // @ViewChild(TestDirective, { static: false }) test: TestDirective;

  ngAfterViewInit() {

  }  

  onSort({ column, direction }: SortEvent) {    
    console.log(column)
    console.log(direction)
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.empService.sortColumn = column;
    this.empService.sortDirection = direction;
  }

  
}
