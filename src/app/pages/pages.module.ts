import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AppLayoutComponent } from '../app.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DashboardComponent, PagesComponent, AppLayoutComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    HttpClientModule
  ]
})
export class PagesModule { }
