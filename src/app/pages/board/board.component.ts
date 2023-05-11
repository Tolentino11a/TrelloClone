import { Component, OnInit } from '@angular/core';
import { faImages } from'@fortawesome/free-regular-svg-icons';
import { faEllipsis,faXmark } from'@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';

import { Column, ToDo } from '../../models/todo.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
    /* Animate items as they're being sorted. */
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    /* Animate an item that has been dropped. */
    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
    `
  ]
})
export class BoardComponent implements OnInit {

  faImages = faImages;
  faEllipsis = faEllipsis;
  faXmark = faXmark;

  // Auxiliar
  isOpenList = false;
  isNameTodo = '';
  isNameColumn = '';

  columns: Column[] = [
    {
      title: 'ToDo',
      isOpenList: false,
      todos: [
        {
          id:'1',
          title:'Task 1'
        },
        {
          id:'2',
          title:'Task 2'
        },
        {
          id:'3',
          title:'Task 3'
        }
      ]
    },
    {
      title: 'Doing',
      isOpenList: false,
      todos: [
        {
          id:'4',
          title:'Task 4'
        },
        {
          id:'5',
          title:'Task 5'
        },
        {
          id:'6',
          title:'Task 6'
        }
      ]
    },
    {
      title: 'Done',
      isOpenList: false,
      todos: [
        {
          id:'7',
          title:'Task 7'
        },
        {
          id:'8',
          title:'Task 8'
        },
        {
          id:'9',
          title:'Task 9'
        }
      ]
    }
  ]
  constructor(
    private dialog: Dialog
  ) {

  }
  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<ToDo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  addColumn() {
    this.columns.push({
      title: 'New Column',
      isOpenList: false,
      todos: [],
    });
  }
  onDrop(event: CdkDragDrop<any[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }

  addTodo(columnCurrent: string) {
    // Obtener el índice de la columna "Doing"
    const todoIndex = this.columns.findIndex(column => column.title === columnCurrent);

    let lastTodoId = '0'; // Inicializar el ID en '0'

    // Obtener el último ID dentro del arreglo de todos de la columna del todo, si es hay items
    if (this.columns[todoIndex].todos.length > 0) {
      lastTodoId = this.columns[todoIndex].todos[this.columns[todoIndex].todos.length - 1].id;
    }

    // Convertir el último ID en un número entero y sumarle 1
    const newId = parseInt(lastTodoId) + 1;

    // Crear un nuevo todo con el ID dinámico y el título ingresado
    const newTodo = { id: newId.toString(), title: this.isNameTodo };

    // Agregar el nuevo todo al arreglo de todos de la columna "Doing"
    console.log(newTodo);
    this.columns[todoIndex].todos.push(newTodo);
    this.isNameTodo = '';
  }

  dropHorizontal(event: CdkDragDrop<any[]>) {
    console.log('weii')
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
  openDialog(toDo: ToDo){
    const dialogRef = this.dialog.open(TodoDialogComponent,{
      minWidth: '300px',
      maxWidth: '50%',
      autoFocus: false,
      data:{
        todo: toDo
      }
    });
    dialogRef.closed.subscribe((output) =>{
      console.log(output);
    })
  }



}
