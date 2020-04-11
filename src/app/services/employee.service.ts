import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of, Subject } from 'rxjs';
import { mEmployee } from '../model/employee';
import { DecimalPipe } from '@angular/common';
import { catchError, debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../properties/table';

interface SearchResult {
  table: mEmployee[];
  total: number;
}

interface Property {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(employee: mEmployee[], column: SortColumn, direction: string): mEmployee[] {
  if (direction === '' || column === '') {
    return employee;
  } else {
    return [...employee].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(employee: mEmployee, term: string, pipe: PipeTransform) {
  return employee.EmpName.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(employee.EmpID).includes(term)
    || pipe.transform(employee.Department).includes(term)
    || pipe.transform(employee.Salary).includes(term);
}



@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private DataTable = [];
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _employee$ = new BehaviorSubject<mEmployee[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _employee: Property = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  private pipe: DecimalPipe
  
  constructor(private http: HttpClient) { 
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._employee$.next(result.table);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  private apiURL: string = '';

  getEmployee(): Observable<mEmployee[]> {    
    this.apiURL = 'http://localhost:8080/users';    
    return this.http.get<mEmployee[]>(this.apiURL).pipe(catchError(this.errorHandler))
  }


  errorHandler(error: HttpErrorResponse) {
    console.log(error.message)
    return throwError(error.message || "Server Error")
  }

  get table$() { return this._employee$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._employee.page; }
  get pageSize() { return this._employee.pageSize; }
  get searchTerm() { return this._employee.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<Property>) {
    Object.assign(this._employee, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    this.getEmployee().subscribe(data => this.DataTable = data);

    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._employee;

    // 1. sort
    let table = sort(this.DataTable, sortColumn, sortDirection);

    // 2. filter
    table = table.filter(data => matches(data, searchTerm, this.pipe));
    const total = table.length;

    // 3. paginate
    table = table.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ table, total });
  }

}
