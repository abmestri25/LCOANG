import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employess.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: number;
  header: string;
  button: string;
  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    phone: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Add Employee' : 'Edit Employee';
    this.button = this.id === 0 ? 'Add' : 'Edit';

    if (this.id != 0) {
      this.employee = this.employeeService.onGetEmployee(this.id);
    }
  }

  onSubmit(form: NgForm) {
    let employee: Employee = {
      id: form.value.id,
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
    };
    if (this.id === 0) {
      this.employeeService.onAdd(employee);
    } else {
      this.employeeService.onEdit(employee);
    }
    this.router.navigateByUrl('/');
  }
}
