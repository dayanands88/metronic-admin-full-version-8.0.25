import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentsService } from '../services/documents.service';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.scss']
})
export class ViewDocumentsComponent implements OnInit {
  subjects: any[] = [];
  data: any;
  dataSource: any;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  constructor(private documentService: DocumentsService) { 
    this.dataSource = new MatTableDataSource([]);

  }
  // columns we will show on the table

  displayedColumns: string[] =['NotificationTitle','NotificationStartDate', 'NotificationEndDate'];
  // ,'NotificationTitle', 'NotificationStartDate','NotificationEndDate','action'
  //  dataSource = new MatTableDataSource([]);
  ngOnInit(): void {
    // this.data = new  MatTableDataSource([]); 
  
     this.getNotificationDetails();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  getNotificationDetails(){
    this.data = {};
    this.data.InType = 2;
    this.documentService.GetNotificationDetails(this.data)
      .subscribe((res)=>{
    
        this.dataSource= new MatTableDataSource(res);
        this.displayedColumns = Object.keys(res);
      })
  }

}
