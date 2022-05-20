import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { SubjectComponent } from './subject/subject.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SubjectAddEditComponent } from './subject-add-edit/subject-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{MatTableModule } from '@angular/material/table';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherAddEditComponent } from './teacher-add-edit/teacher-add-edit.component';
@NgModule({
  declarations: [
    MasterComponent,
    SubjectComponent,
    SubjectAddEditComponent,
    TeacherComponent,
    TeacherAddEditComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class MasterModule { }
