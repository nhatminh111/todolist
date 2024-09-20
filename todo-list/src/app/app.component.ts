import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodo: any;

  onTodoAdded(todo: any): void {
    this.newTodo = todo;  // Lưu todo mới được thêm
  }
}
