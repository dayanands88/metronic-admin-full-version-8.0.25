import { ChangeDetectorRef, Component, OnInit,ViewChild, VERSION, ElementRef, QueryList, ViewChildren, Input} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

import { DocumentsService } from 'src/app/modules/account/services/documents.service';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Document } from '../_models/document';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {
  @ViewChild('select') select: MatSelect;
  @ViewChild('selectStudent') selectStudent: MatSelect; 
  @ViewChild('selectSection') selectSection: MatSelect; 
  @Input() document: Document;
  allSelected=false;
  classes: any[] = [];
  students: any[] = [];
  allStudentSelected=false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  docTypes : any;
  docUsers : any;
  docSubjects : any;
  public newDocumentsForm!: FormGroup;
  selectedApplicable: number;
  selectedClasses: any[];
  docSections:any;
  selectedStatus:any;
  htmlContent = '';
  docTitle = '';
  docSubject = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  @ViewChild('videoImport')
  videoImport: ElementRef;
  fileToUpload: File | null;
  Notification: any;
  data: any;
  linkVideo = '';
  txtVideoLink = '';
  videoLinkData:any;
  documentUploadData:any;
  pizzaIng:any;
  public displayedColumns: string[] = ['no', 'videolink', 'action'];
  public displayedDocColumns: string[] = ['no', 'doclink', 'filename','action'];
  //Added By Dayanand Sawant for student 
  public displayedStudentColumns: string[] = ['select','Student_Name', 'Class','Section'];
  studentData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren('checkBox') checkBox: QueryList<any>;
  selection = new SelectionModel<any>(true, []);
  //Ended By Dayanand Sawant for student
  fileName: string | undefined;
  fileNameString: string | undefined;
  noId = '0';
  constructor(public authService: AuthService,private _snackbar:MatSnackBar,private formBuilder: FormBuilder,private cdr: ChangeDetectorRef, private _http:  DocumentsService,private route: ActivatedRoute,private documentService: DocumentsService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
    if(typeof(window.history.state.id) !='undefined')
    {
       this.noId = window.history.state.id;
       
       
    }
  }
  openSnackBar(message:string,action:string)
  {
     this._snackbar.open(message,action,{duration:3000});
  }

  ngOnInit(): void {


    this.newDocumentsForm = this.formBuilder.group({
      docType:  new FormControl('',[Validators.required,]),
      docUser: new FormControl('',[Validators.required,]),
      applicableTo: new FormControl('1',[]),
      docClass:new FormControl('',[]),
      docSection: new FormControl('',[]),
      docStudent: new FormControl('',[]),
      docTitle: new FormControl('',[]),
      docData:new FormControl('',[]),
      docSubject:new FormControl('',[]),
      docVideo: new FormControl('',[]),
      docStartDate:new FormControl(new Date(),[]),
      docEndDate:new FormControl(new Date(),[]),
    });

    this.selectedStatus='1';
    this.pizzaIng=[
      {name : "Allowed to submit online", checked : false},
      {name : "Send SMS", checked : false}
    ];

   this.videoLinkData = new MatTableDataSource([]);
   this.documentUploadData = new MatTableDataSource([]); 
   this.studentData = new  MatTableDataSource([]); 

    this._http.getDocType().subscribe(
      (res) => {
        console.log(res);
        this.docTypes = res.Table;
        this.docUsers = res.Table1;
        this.classes  = res.Table2;
        this.docSections = res.Table3;
        this.docSubjects = res.Table4;
      },
      (err) => {}
    );

    this.EditNotification(this.noId)


  }

  deleteVideoLink(index : number)
  {
     this.videoLinkData.data.splice(index,1);
     this.videoLinkData.filter = '';
  }
  deleteDocLink(index : number)
  {
     this.documentUploadData.data.splice(index,1);
     this.documentUploadData.filter = '';
  }

  setStudent(item:any)
  {
    this.data = {};
    this.data.InType = 2;
    this.data.TypeCode = this.select.value.join(',');
    this.data.SectionCode = this.selectSection.value.join(',');
    // this.data.SectionCode = ""+ this.newDocumentsForm.value.docSection + "";
    this._http.getStudentSearch(this.data).subscribe(
      (res) => {
        this.studentData = res.Table;
      },
      (err) => {}
    );
  }

  onFileChange(files: FileList) {
    
    this.videoImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
     reader.onload = () =>{
      this.fileNameString =  reader.result?.toString().split(',')[1];
     }
    this.fileToUpload = files.item(0);
    this.fileName = files.item(0)?.name;
  }
 
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  toggleAllSelectionSection() {
    if (this.allSelected) {
      this.selectSection.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectSection.options.forEach((item: MatOption) => item.deselect());
    }
    this.setStudent('');
  }
  addVideo()
  {
    if(this.txtVideoLink == '')
    {
      this.openSnackBar('Please add video link','');
      return;
    }
    this.videoLinkData.data.push({'no': this.videoLinkData.data.length +1,'videolink':this.txtVideoLink,'action':''});
    this.videoLinkData.filter = '';
    this.txtVideoLink = '';
  }
  addDocument()
  {
    if(this.fileToUpload == null)
    {
      this.openSnackBar('Please upload document','');
      return;
    }
    this.documentUploadData.data.push({'filename':this.fileName,'no': this.videoLinkData.data.length +1,'doclink':this.fileNameString,'action':''});
    this.documentUploadData.filter = '';
    this.videoImport.nativeElement.value = '';
    this.fileToUpload = null;
    this.fileName = '';
    this.fileNameString = '';
  }
  toggleStudentAllSelection() {
    if (this.allStudentSelected) {
      this.selectStudent.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectStudent.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionStudentClick() {
    let newStatus = true;
    this.selectStudent.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allStudentSelected = newStatus;
  }
   optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.studentData.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    // if there is a selection then clear that selection
    if (this.isSomeSelected()) {
      this.selection.clear();
    } else {
      this.isAllSelected()
        ? this.selection.clear()
        : this.studentData.data.forEach(row => this.selection.select(row));
    }
  }

  isSomeSelected() {
    console.log(this.selection.selected);
    return this.selection.selected.length > 0;
  }

  EditNotification(id : string){


    if(this.noId != '0')
    {
     this.data = {};
     this.data.InType = 4;
     this.data.TypeCode =  this.noId.toString();
     this.data.SectionCode = this.noId.toString() ;
     this.documentService.GetNotificationDetail(this.data)
       .subscribe((res)=>{
        console.log(res);
        if(res){
          
          this.newDocumentsForm.controls.docTitle.setValue(res.documentTitle);
          this.newDocumentsForm.controls.docType.setValue(res.documentTypeId);
          this.newDocumentsForm.controls.docUser.setValue(res.userTypeId);
          this.newDocumentsForm.controls.docSubject.setValue(res.subjectId);
       
          this.documentUploadData.data = res.documentsData;
          this.videoLinkData.data = res.documentsData;
          
        }
       });
    }
  }

  SettoControlValue(data: any)
  {

 
    this.newDocumentsForm.patchValue({
      docStartDate : data.NotificationStartDate,
      docEndDate: data.NotificationEndDate
    });
   
  }

  

  saveSettings() {
    console.log(this.select.value.join(','));
    // console.log(this.selectStudent.value.join(','));
    var test = this.authService.getAuthFromLocalStorage();
    // this.isLoading$.next(true);
    // setTimeout(() => {
    //   this.isLoading$.next(false);
    //   this.cdr.detectChanges();
    // }, 1500);
    //if (this.newDocumentsForm.valid) 
    {
      if(parseInt(this.newDocumentsForm.value.docType) == null || this.newDocumentsForm.value.docType =='')
      {
        this.newDocumentsForm.value.docType = 0;
      }
      if(parseInt(this.newDocumentsForm.value.docUser) == null  || this.newDocumentsForm.value.docUser =='')
      {
        this.newDocumentsForm.value.docUser = 0;
      }
      if(parseInt(this.selectedStatus) == null || this.selectedStatus =='')
      {
        this.selectedStatus = 0;
      }
      if(parseInt(this.newDocumentsForm.value.docSubject) == null ||this.newDocumentsForm.value.docSubject=='')
      {
        this.newDocumentsForm.value.docSubject = 0;
      }
      this.data = {};
      this.data.DocumentTypeId = parseInt(this.newDocumentsForm.value.docType);
      this.data.UserTypeId =  parseInt(this.newDocumentsForm.value.docUser);
      this.data.DocumentTitle = this.newDocumentsForm.value.docTitle;
      this.data.DocumentContent = this.htmlContent;
      this.data.ApplicableTo = parseInt(this.selectedStatus);
      this.data.SubjectId = parseInt(this.newDocumentsForm.value.docSubject);
      this.data.DocumentStartDate =  this.newDocumentsForm.value.docStartDate;
      this.data.DocumentEndDate = this.newDocumentsForm.value.docEndDate;
      this.data.LoginId = test?.id;
      this.data.Classes = this.select.value.join(',');
      this.data.Students =  this.selection.selected;
      this.data.VideoLinks = this.videoLinkData.data;
      this.data.DocumentsData = this.documentUploadData.data;
      // this.data.Students = this.studentData.data;
      console.log(this.data);
      this._http.postStudentAssignment(this.data).subscribe(
        (res) => {
          if(res.statusCode == 200)
          {
            this.videoLinkData.data = [];
            this.documentUploadData.data = [];
            this.students = [];
            this.newDocumentsForm.reset();
            this.htmlContent = '';
            this.selectedStatus = '0';
            this.select.options.forEach((item: MatOption) => item.deselect());
            this.studentData = '';
            // this.selectStudent.options.forEach((item: MatOption) => item.deselect());
            this.openSnackBar(res.description,'');
            return;
          }
          else
          {
            this.openSnackBar('Error','');
            return;
          }
        },
        (err) => {}
      );

    }
  }
  

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}

