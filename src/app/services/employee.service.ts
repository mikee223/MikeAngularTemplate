import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { mEmployee } from '../model/employee';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  private apiURL: string = '';

  getEmployee(): Observable<mEmployee[]> {
    this.apiURL = 'http://localhost:8080/users';
    return this.http.get<mEmployee[]>(this.apiURL).pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error.message)
    return throwError(error.message || "Server Error")
  }

}
