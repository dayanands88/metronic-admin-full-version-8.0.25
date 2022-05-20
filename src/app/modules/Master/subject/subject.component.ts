import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectService } from '../services/subject.service';
import { subject } from '../_models/subject';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subjects: subject[] = [];
  constructor(private subjectService: SubjectService) { }

  // columns we will show on the table
  displayedColumns: string[] =['subjectName','subjectcode', 'remarks'];
 //the source where we will get the data
 public dataSource = new MatTableDataSource<subject>();
 @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
   this.getSubjects();

  }

  // getSubjects() {
  //   this.subjectService.getSubject()
  //   .subscribe((res)=>{
  //     console.log(res);
  //     this.dataSource.data = res;
  //   })
  // }

  getSubjects(){
    this.subjectService.getSubject()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
        console.log(this.dataSource.data);
      })
  }

}
