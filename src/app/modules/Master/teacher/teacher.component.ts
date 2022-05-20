import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../_models/Teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  teacher: Teacher[] = [];
  id: string;
  pageTitleCssClasses: string = '';
  constructor(private teacherService: TeacherService,  private route: ActivatedRoute,  private router: Router) { }
// columns we will show on the table
  displayedColumns: string[] =['teachercode','teacherName', 'remarks','action'];
//the source where we will get the data
  public dataSource = new MatTableDataSource<Teacher>();
  ngOnInit(): void {
    // this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
  
    
    this.getTeachers();
  }

  getTeachers(){
    this.teacherService.getTeachers()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
        console.log(this.dataSource.data);
      })
  }

}
