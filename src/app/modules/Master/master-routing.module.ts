import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';
import { StudentComponent } from './student/student.component';
import { SubjectAddEditComponent } from './subject-add-edit/subject-add-edit.component';
import { SubjectComponent } from './subject/subject.component';
import { TeacherAddEditComponent } from './teacher-add-edit/teacher-add-edit.component';
import { TeacherComponent } from './teacher/teacher.component';
const routes: Routes = [{
  path: '',
  component: MasterComponent,
  children: [
    {
      path: 'student',
      component: StudentComponent,
    },
    {
      path: 'teacher',
      component: TeacherComponent,
    },
    {
      path: 'subject',
      component: SubjectComponent,
    },
    {
      path: 'subjectAddEdit',
      component: SubjectAddEditComponent,
    },
    {
      path: 'teacherAddEdit',
      component: TeacherAddEditComponent,
    },
    {
      path: 'teacherAddEdit/edit/:id',
      component: TeacherAddEditComponent,
    },
    { path: '', redirectTo: 'student', pathMatch: 'full' },
    { path: '**', redirectTo: 'teacher', pathMatch: 'full' },
    { path: '**', redirectTo: 'subject', pathMatch: 'full' },
    { path: '**', redirectTo: 'subjectAddEdit', pathMatch: 'full' },
    { path: '**', redirectTo: 'teacherAddEdit', pathMatch: 'full' },
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
