import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject-add-edit',
  templateUrl: './subject-add-edit.component.html',
  styleUrls: ['./subject-add-edit.component.scss']
})
export class SubjectAddEditComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder ,private subjectService: SubjectService, private route: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      SubjectCode:['',Validators.required],
      SubjectName:['',Validators.required],
      Remarks:['',Validators.required]
    })
  }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
  onSubmit(){
    this.createSubject();
    
  }

  private createSubject() {
    this.subjectService.createSubject(this.form.value);
    //this.toastr.success('Profile updated successfully');
    this.route.navigate(['/crafted/master/subject']);
    
  }

}
