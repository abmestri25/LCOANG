import { Component } from "@angular/core";

import { Todo } from "./todo";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Project CC";

  todoValue: string;
  // referred Todo interface
  list: Todo[];
  // this is run when the app start
  ngOnInit() {
    this.list = [];
    this.todoValue = "";
  }

  // functions
  addItem() {
    if (this.todoValue !== "") {
      // created object
      const newItem: Todo = {
        id: Date.now(),
        value: this.todoValue,
        isDone: false,
      };
      // pushed to array
      this.list.push(newItem);
    }
    // made input field blank
    this.todoValue = "";
  }

  deleteItem(id: number) {
    this.list = this.list.filter((item) => item.id !== id);
  }
}
