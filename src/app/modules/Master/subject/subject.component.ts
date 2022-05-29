import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectService } from '../services/subject.service';
import { subject } from '../_models/subject';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subjects: subject[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource<subject>();
  constructor(private subjectService: SubjectService) {
    
   }

  // columns we will show on the table
  displayedColumns: string[] =['subjectName','subjectcode', 'remarks','Action'];
 //the source where we will get the data


  ngOnInit(): void {
   this.getSubjects();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.dataSource.data = res;
      })
  }

}
