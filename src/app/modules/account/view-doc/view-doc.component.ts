import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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

  constructor(private documentService: DocumentsService,private dialog: MatDialog,private router: Router) { }

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
    this.data.InType = 3;
    this.documentService.GetNotificationDetails(this.data)
      .subscribe((res)=>{
        this.dataSource.data = res;
      });
  }

  redirectToCreateDoc(doc:any)
  {
    interface Options {
      id?: string;
    }
  
  // Error, no property 'z' in 'Options'
  let q1: Options = { id: doc.NotificationaDetailId };
    this.router.navigateByUrl('crafted/account/create-doc', { state :q1});
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
  
  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 

  }


