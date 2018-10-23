import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  itemList: any[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.itemList = [];
        item.forEach(ele => {
          let x = ele.payload.toJSON();
          x["$key"] = ele.key;
          this.itemList.push(x);
        })

        this.itemList.sort((a, b) => {
          return a.isChecked - b.isChecked;
        })
      })



  }

  onAdd(itemTitle){
    this.todoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key:string, isChecked){
    this.todoService.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete($key:string){
    this.todoService.removeTitle($key);
  }
}
