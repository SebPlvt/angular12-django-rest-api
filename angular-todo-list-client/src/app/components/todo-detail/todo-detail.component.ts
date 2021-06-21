import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/app/services/todo-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoList } from 'src/app/models/todo_list.model';


@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  currentTodo: TodoList = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(
    private todoListService: TodoListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getTodo(this.route.snapshot.params.id);
  }

  getTodo(id: string): void {
    this.todoListService.get(id)
      .subscribe(
        data => {
          this.currentTodo = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTodo.title,
      description: this.currentTodo.description,
      published: status
    };
    this.message = '';

    this.todoListService.update(this.currentTodo.id, data)
      .subscribe(
        response => {
          this.currentTodo.published = status;
          console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';

        },
        error => {
          console.log(error);
        }
        );
  }

  updateTodo(): void {
    this.message = '';

    this.todoListService.update(this.currentTodo.id, this.currentTodo)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This todo was updated successfully!';
        },
        error => {
          console.log(error);
        }
        );
  }

  deleteTodo(): void {
    this.todoListService.delete(this.currentTodo.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/todo_list']);
        },
        error => {
          console.log(error);
        }
        );
  }

}
