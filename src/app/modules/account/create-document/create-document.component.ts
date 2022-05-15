import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { FormBuilder, FormGroup,Validators } from '@angular/forms';

import { DocumentsService } from 'src/app/modules/account/services/documents.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  docTypes : any;
  docUsers : any;
  public newDocumentsForm!: FormGroup;
  selectedApplicable: number;
  selectedClasses: any[];
  classes: any[];

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
      docStudent: [null],
      docTitle: [null],
      docData:[null],
      docSubject:[null],
      docStartDate:[null],
      docEndDate:[null],
    });
    this.selectedApplicable =1;
    this.classes = [
      {id: 1, viewValue: "1A"},
      {id: 2, viewValue: "2B"},
      {id: 3, viewValue: "4C"},
      {id: 4, viewValue: "5D"},
      {id: 5, viewValue: "7E"}
    ]
    this._http.getDocType().subscribe(
      (res) => {
        console.log(res);
        this.docTypes = res.Table;
        this.docUsers = res.Table1;
      },
      (err) => {}
    );
  }
  selectAll(select: MatSelect, values: any, array: any) {
    select.value = values;
    array = values;
    console.log(this.selectedClasses); 
  }

  deselectAll(select: MatSelect) {
    this.selectedClasses = [];
    select.value = [];
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
  equals(objOne: { id: any; }, objTwo: { id: any; }) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
