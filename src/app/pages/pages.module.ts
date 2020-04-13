import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AppLayoutComponent } from '../app.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TestDirective } from '../properties/test.directive';
import { NgbdSortableHeader } from '../properties/table.directive';


@NgModule({
  declarations: [DashboardComponent, PagesComponent, AppLayoutComponent,TestDirective,NgbdSortableHeader],
  imports: [    
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
