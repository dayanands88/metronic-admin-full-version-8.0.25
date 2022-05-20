import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Teacher } from '../_models/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  baseUrl = "https://localhost:7103/api/";
 
  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.baseUrl + 'TeacherMaster/GetTeacherMaster');
  }

  createTeacher(model: any) {
    return this.http.post<any>(this.baseUrl + 'TeacherMaster/CreateTeacherMaster', model).pipe(
      map(() => {
        
      }))
  }

  getById(id: string) {
    return this.http.get<Teacher>(this.baseUrl + `TeacherMaster/${id}`);
}
}
