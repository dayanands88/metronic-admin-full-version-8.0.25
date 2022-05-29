import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DocumentsService } from '../services/documents.service';

@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.component.html',
  styleUrls: ['./view-doc.component.scss']
})
export class ViewDocComponent implements OnInit {
  data: any;
  public dataSource = new MatTableDataSource<Document>();

  constructor(private documentService: DocumentsService,private dialog: MatDialog) { }

  displayedColumns: string[] =['NotificationTitle','NotificationType','NotificationStartDate','NotificationEndDate','Action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getNotificationDetails();
  }
ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  

  getNotificationDetails(){
    this.data = {};
    this.data.InType = 2;
    this.documentService.GetNotificationDetails(this.data)
      .subscribe((res)=>{
        this.dataSource.data = res;
      })
  }

  removeNotification(employeeObj) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Notification',
        message: 'Are you sure, you want to remove an Notification: ' + employeeObj.NotificationTitle
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.documentService.DeleteStudentAssignment(employeeObj)
        .subscribe((res) =>{
          this.getNotificationDetails();
        })
        // this.employeeList = this.employeeList.filter(item => item.employeeId !== employeeObj.employeeId);
      }
    });
  }

 

}
