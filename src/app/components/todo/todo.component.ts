import { TodoService } from './../../services/todo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @ViewChild('todoForm') todoForm!:NgForm;
   todoList:Task[]=[];
   progressTasks:Task[]=[];
   doneTasks:Task[]=[];
   editMode:boolean = false;
   editedTask:Task={description:"",done:false}
   editItemIndex:number=0;
  constructor(private todoService:TodoService){}


  ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
    this.doneTasks = this.todoService.getDoneTasks();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onSubmit()
  {
    const taskDescription = this.todoForm.value.taskDesc ;
    const task = new Task(taskDescription,false)
    if(this.editMode)
    {
     this.todoService.updateTask(this.editItemIndex,task);
     this.editMode = false ;
    }
    else
    {
      this.todoService.addTask(task);
    }
   this.todoForm.reset();
  }
  onEditTask(index:number)
  {
    this.editMode = true ;
    this.editItemIndex = index;
    this.editedTask = this.todoService.getTask(index);
    this.todoForm.setValue({
      taskDesc:this.editedTask.description,
    })
  }
  deleteTodoItem(index:number)
  {
   this.todoService.deleteTodoList(index);
  }
  deleteDoneItem(index:number)
  {
   this.todoService.deleteDoneTask(index);
  }
}
