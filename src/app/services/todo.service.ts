import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 private todoList:Task[] = [];
 private doneTasks:Task[] = [];
  constructor() { }


 getTodoList()
 {
  return this.todoList;
 }
 getDoneTasks()
 {
  return this.doneTasks;
 }
 
 getTask(index: number)
 {
  return this.todoList[index];
 }

addTask(task:Task) {
  this.todoList.push(task);
  }

updateTask(index:number,newTask:Task)
{
 this.todoList[index] = newTask ; 
}
   
deleteTodoList(index:number) 
{
  this.todoList.splice(index,1) 
}

deleteDoneTask(index:number) 
{
  this.doneTasks.splice(index,1) 
}
}


