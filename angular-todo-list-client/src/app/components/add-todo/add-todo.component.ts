import { Component, OnInit } from '@angular/core';
import { TodoList } from 'src/app/models/todo_list.model';
import { TodoListService } from 'src/app/services/todo-list.service';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todoList: TodoList = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  saveTodo(): void {

    const data = {
      title: this.todoList.title,
      description: this.todoList.description
    };

    this.todoListService.create(data)
      .subscribe(
        response => { console.log(response);
        this.submitted = true;
      },
      error => { console.log(error);}
      );
  }

  newTodo(): void {
    this.submitted = false;
    this.todoList = {
      title: '',
      description: '',
      published: false
    };
  }
}
