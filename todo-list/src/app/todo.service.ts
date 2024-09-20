import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://dummyjson.com/todos';

  constructor(private http: HttpClient) {}
  getTodos(limit = 20, skip = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }

  getTodoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addTodo(todo: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/add`, todo)
      .pipe(catchError(this.handleError('addTodo')));
  }
  deleteTodo(id: number): Observable<any> {
    console.log(`Todo with id ${id} would be deleted (simulation)`);
    return of({ id, isDeleted: true, deletedOn: new Date() });
  }
  
  updateTodo(id: number, todo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, todo).pipe(
      catchError(this.handleError('updateTodo'))
    );
  }

  private handleError(operation = 'operation') {
    return (error: any): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return of({ error: `${operation} failed` });
    };
  }
}
