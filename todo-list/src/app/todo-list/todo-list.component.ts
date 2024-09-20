import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() newTodo: any;

  todos: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newTodo'] && changes['newTodo'].currentValue) {
      this.todos.push(this.newTodo); 
    }
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data.todos;
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    }, (error) => {
      console.error('Error deleting todo:', error);
    });
  }
  updateTodo(todo: any): void {
    this.todoService.updateTodo(todo.id, {
      todo: todo.todo,
      completed: todo.completed
    }).subscribe(() => {
      console.log(`Todo with Name: ${todo.todo}, ID: ${todo.id}, State: ${todo.completed}, updated successfully.`);
    }, (error) => {
      console.error('Error updating todo:', error);
    });
  }
}
