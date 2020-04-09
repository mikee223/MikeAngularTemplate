import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { mLayout } from '../model/layout';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  // public PageTitle;
  constructor(private http: HttpClient) {
  }

  // Page Title
  public PageTitle = new BehaviorSubject<string>(null);

  setPageTitle(val): void {
    this.PageTitle.next(val);
  }

  getPageTitle(): Observable<string> {
    return this.PageTitle.asObservable();
  }
  // End Page Title


}
