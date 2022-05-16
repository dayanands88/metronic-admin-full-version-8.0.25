import { ChangeDetectorRef, Component, OnInit,ViewChild, VERSION} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { FormBuilder, FormGroup,Validators } from '@angular/forms';

import { DocumentsService } from 'src/app/modules/account/services/documents.service';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {
  @ViewChild('select') select: MatSelect;

  allSelected=false;
  classes: any[] = [];
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
  constructor(private formBuilder: FormBuilder,private cdr: ChangeDetectorRef, private _http:  DocumentsService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.newDocumentsForm = this.formBuilder.group({
      docType: [null, Validators.required],
      docUser: [null, Validators.required],
      applicableTo: ['1'],
      docClass: [null],
      docSection: [null],
      docStudent: [null],
      docTitle: [null],
      docData:[null],
      docSubject:[null],
      docStartDate:[null],
      docEndDate:[null],
    });
    this.selectedStatus='1';
   
    this._http.getDocType().subscribe(
      (res) => {
        console.log(res);
        this.docTypes = res.Table;
        this.docUsers = res.Table1;
        this.classes  = res.Table2;
        this.docSections =res.Table3;
        this.docSubjects = res.Table4;
      },
      (err) => {}
    );
  }
 
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
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
  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
    if (this.newDocumentsForm.valid) {
    }
  }
  

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
