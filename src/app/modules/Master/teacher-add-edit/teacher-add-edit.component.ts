import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-teacher-add-edit',
  templateUrl: './teacher-add-edit.component.html',
  styleUrls: ['./teacher-add-edit.component.scss']
})
export class TeacherAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  constructor(private formBuilder: FormBuilder,private teacherService: TeacherService,  private route: ActivatedRoute, private router: Router,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;


    this.form = this.formBuilder.group({
      teachercode:['',Validators.required],
      teacherName:['',Validators.required],
      remarks:['',Validators.required]
    })

    if (!this.isAddMode) {
      this.teacherService.getById(this.id)
          .pipe(first())
          .subscribe(x => this.form.patchValue(x));
  }

  }
  get f() { return this.form.controls; }

  onSubmit(){
    this.id = this.route.snapshot.params['id'];
    this.createTeacher();
  }

  private createTeacher() {
    this.teacherService.createTeacher(this.form.value).subscribe(() => {
      this.toastr.success('Teacher Added successfully');
      
      setTimeout(() => {
        console.log('sleep');
        this.router.navigate(['/crafted/master/teacher']);
        // And any other code that should run only after 5s
      }, 5000);
    });

  }

  

}

