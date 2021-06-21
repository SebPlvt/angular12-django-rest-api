import { Component, OnInit } from '@angular/core';
import { TodoList } from 'src/app/models/todo_list.model';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList?: TodoList[];
  currentTodo: TodoList = {};
  currentIndex = -1;
  title = '';

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.retrieveTodos();
  }

  retrieveTodos(): void {
    this.todoListService.getAll()
      .subscribe(
        data => {
          this.todoList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  refreshList(): void {
    this.retrieveTodos();
    this.currentTodo = {};
    this.currentIndex = -1;
  }

  setActiveTodo(todo: TodoList, index: number): void {
    this.currentTodo = todo;
    this.currentIndex = index;
  }

  removeAllTodos(): void {
    this.todoListService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        }
      );
  }

  searchTitle(): void {
    this.currentTodo = {};
    this.currentIndex = -1;

    this.todoListService.findByTitle(this.title)
      .subscribe(
        data => {
          this.todoList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

}
