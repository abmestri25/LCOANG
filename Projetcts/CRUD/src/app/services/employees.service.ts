import { Injectable } from '@angular/core';
import { Employee } from '../models/employess.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  employees : Employee[] = []
  constructor() { }


  onGet(){
    return this.employees
  }

  onGetEmployee(id:number){
    return this.employees.find(x => x.id === id)
  }

  onAdd(employee: Employee){
    this.employees.push(employee)
  }

  onEdit(employee : Employee){
    let oldEmp = this.employees.find(x => x.id === employee.id)
    oldEmp.name = employee.name
    oldEmp.email = employee.email
    oldEmp.phone = employee.phone
  }

  onDelete(id:number){
    let employee = this.employees.find(x => x.id === id)
    let index = this.employees.indexOf(employee,0)
    this.employees.splice(index,1)
  }
}
