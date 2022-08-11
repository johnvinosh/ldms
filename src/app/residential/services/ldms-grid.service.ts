import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  Sorts,
} from '@syncfusion/ej2-angular-grids';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LDMSGridService extends Subject<DataStateChangeEventArgs> {
  private REST_API_URL = 'http://localhost:7070/residential';

  constructor(private http: HttpClient) {
    super();
  }

  public execute(
    state: DataStateChangeEventArgs,
    tableName: string,
    isAttribute?: boolean
  ): void {
    this.getData(state, tableName, isAttribute).subscribe((x) => super.next(x));
  }

  public getData(
    state?: DataStateChangeEventArgs,
    tableName?: string,
    isAttribute?: boolean
  ): Observable<DataStateChangeEventArgs> {
    let data: any = {};

    if ((state?.where || []).length) {
      state?.where?.forEach((obj) => {
        obj.predicates.forEach((predicate) => {
          data[predicate.field] = predicate.value;
        });
      });
    }

    let params = new HttpParams();

    if (state?.take) {
      params = params.append('size', state.take);
      params = params.append('page', (state.skip ?? 0) / state.take);
    }

    if ((state?.sorted || []).length) {
      state?.sorted?.forEach((obj: Sorts) => {
        let colName = obj.name!;
        let sortDir = obj.direction === 'descending' ? 'desc' : 'asc';
        params = params.append('sort', `${colName},${sortDir}`);
      });
    }

    if ((state?.search || []).length) {
      state?.search?.forEach((obj: any) => {
        params = params.append('filter', obj.key as string);
      });
    }

    let url = `${this.REST_API_URL}/${tableName}`;

    if (isAttribute) {
      url = `${this.REST_API_URL}/attribute-manager`;
      data.tableName = tableName;
    }

    return this.http.post<DataStateChangeEventArgs>(url, data, {
      params,
    });
  }

  add(
    state: DataSourceChangedEventArgs,
    tableName: string,
    isAttribute?: boolean
  ): Observable<any> {
    let url = `${this.REST_API_URL}/${tableName}/action`;

    if (isAttribute) {
      url = `${this.REST_API_URL}/attribute-manager/action`;
    }

    return this.http.post<any>(url, state.data);
  }

  update(
    state: DataSourceChangedEventArgs,
    tableName: string,
    isAttribute?: boolean
  ): Observable<any> {
    let url = `${this.REST_API_URL}/${tableName}/action`;

    if (isAttribute) {
      url = `${this.REST_API_URL}/attribute-manager/action`;
    }
    return this.http.put<any>(url, state.data);
  }

  delete(
    state: DataSourceChangedEventArgs,
    tableName: string,
    isAttribute?: boolean
  ): Observable<any> {
    const id = (state.data as any)[0].id;

    let url = `${this.REST_API_URL}/${tableName}/action/delete/${id}`;

    if (isAttribute) {
      url = `${this.REST_API_URL}/attribute-manager/action/delete/${id}`;
    }

    return this.http.delete<any>(url);
  }
}
