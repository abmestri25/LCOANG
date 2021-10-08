import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees = []
  constructor(private employeeService:EmployeesService) { }

  ngOnInit(): void {
    this.employees = this.employeeService.onGet()
  } 

  onDelete(id:number){
    this.employeeService.onDelete(id)
  }

}
