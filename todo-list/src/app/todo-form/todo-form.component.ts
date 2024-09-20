import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() todoAdded = new EventEmitter<any>();

  newTodo = {
    todo: '',
    completed: false,
    userId: 5 // Giả định User ID
  };

  constructor(private todoService: TodoService) {}

  addTodo(): void {
    if (this.newTodo.todo.trim() === '') {
      return;
    }
    
    this.todoService.addTodo(this.newTodo).subscribe(
      (response) => {
        this.todoAdded.emit(response);  // Phát tín hiệu với todo đã thêm vào
        this.newTodo.todo = '';  // Reset form
      },
      (error) => {
        console.error('Error adding todo:', error);
      }
    );
  }
}
