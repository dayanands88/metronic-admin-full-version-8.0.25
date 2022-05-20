import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { StudentService } from '../services/student.service';
import { subject } from '../_models/subject';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  students: Partial<subject[]>;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {

  }
  getStudents() {
    this.studentService.getStudent().subscribe(students => {
      this.students = students;
    })
  }

}
